var express = require('express')

const { Validators } = require("../utils/validators")

const { accountManager } = require('../managers/account_manager')
const { rideManager } = require('../managers/ride_manager')
const { ratingManager } = require('../managers/rating_manager')
const { joinRequestManager } = require('../managers/join_request_manager')
const { messageManager } = require('../managers/message_manager')

const { Account } = require('../models/account')
const { Ride } = require('../models/ride')
const { Rating } = require('../models/rating')
const { JoinRequest } = require('../models/join_request')
const { Message } = require('../models/message')

var router = express.Router()

router.get('/', (req, res) => {
    var keyword = req.query.key
    var accounts = accountManager.accounts.filter((account)=>{
        if(
            account.first_name.search(keyword) >= 0 ||
            account.last_name.search(keyword) >= 0  ||
            account.phone.search(keyword) >= 0
            ) {
            return true
        }
    })
    var output = []

    for (var i = 0; i < accounts.length; i++) {
        account = accounts[i]
        output.push({
            aid: account.aid,
            name: account.getFullName(),
            date_created: account.date_created,
            is_active: account.is_active
        })
    }

    return res.status(200).json(output)
})

router.post('/', (req, res) => {
    try {
        if (req.body.is_active == true) throw "Invalid value for is_active"

        var account = new Account(
            req.body.first_name, 
            req.body.last_name, 
            req.body.phone, 
            req.body.picture, 
            req.body.is_active
        )
        accountManager.add(account)
    } catch (error) {
        return Validators.createValidationError(req, res, error)
    }
    return res.status(201).json({aid: account.aid})
})

router.put('/:aid', (req, res) => {
    try {
        var account = accountManager.get(req.params.aid)
        account.update(
            req.body.first_name, 
            req.body.last_name, 
            req.body.phone, 
            req.body.picture, 
            req.body.is_active
        )
    } catch (error) {
        console.log(error)
        return Validators.createValidationError(req, res, error)
    }
    return res.status(204).send()
})

router.put('/:aid/status', (req, res) => {
    
    try {
        if (req.body.is_active != true) throw "Invalid value for is_active"
            
        var account = accountManager.get(req.params.aid)
        account.update(
            req.body.first_name, 
            req.body.last_name, 
            req.body.phone, 
            req.body.picture, 
            req.body.is_active
        )
    } catch (error) {
        console.log(error)
        return Validators.createValidationError(req, res, error)
    }
    return res.status(204).send()
})

router.post('/:aid/ratings', (req, res) => {
    try {
        var account = accountManager.get(req.params.aid)
        var ride = rideManager.get(req.body.rid)
        var rater = accountManager.get(req.body.sent_by_id)
        var rating_type = 'rider'
        if (rater.aid != ride.aid) {
            var requests = joinRequestManager.getByRid(ride.rid).filter((request)=>{
                return request.aid == rater.aid
            })
            if (requests.length == 0)
                throw "This account ("+rater.aid+ ") didn't create this ride ("+ride.rid+") nor was it a passenger"
            else
                rating_type = 'driver'
        }
        var rating = new Rating(
            ride.rid,
            account.aid,
            rater.aid,
            req.body.rating,
            req.body.comment,
            ride.date_time.date
        )
        rating.rating_type = rating_type
        ratingManager.add(rating)
        res.set({
            'Location': '/accounts/'+account.aid+'/ratings/'+rating.sid
        })
        return res.status(201).send({sid: rating.sid})
    } catch (error) {
        console.log(error)
        return Validators.createValidationError(req, res, error)
    }
})

router.get('/:aid/:rider_type', (req, res) => {
    try {
        var account = accountManager.get(req.params.aid)
        var ratings = ratingManager.getRatings(account.aid, req.params.rider_type)
        var rides = rideManager.getByAid(account.aid)
        var num_rides = 0
        var num_ratings = 0
        if (req.params.rider_type == 'rider') {
            var requests = joinRequestManager.getByAid(account.aid).filter((request)=>{
                return request.ride_confirmed
            })
            num_rides = requests.length
        }
        else if (req.params.rider_type == 'driver') {
            num_rides = rides.length
        }
        var detail = []
        for (var i = 0; i < ratings.length; i++) {
            rating = ratings[i]
            detail.push({
                rid: rating.rid,
                sent_by_id: rating.sent_by_id,
                first_name: accountManager.get(rating.sent_by_id).first_name,
                date: rating.date_created,
                rating: rating.rating,
                comment: rating.comment
            })
        }
        return res.status(200).json({
            aid: account.aid,
            first_name: account.first_name,
            rides: num_rides,
            ratings: ratings.length,
            average_rating: ratingManager.getAverageRating(ratings),
            detail: detail
        })
    } catch (error) {
        console.log(error)
        return Validators.createValidationError(req, res, error)
    }
})

module.exports = router
