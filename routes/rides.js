var express = require('express')

const { Validators } = require("../utils/validators")

const { accountManager } = require('../managers/account_manager')
const { rideManager } = require('../managers/ride_manager')
const { ratingManager } = require('../managers/rating_manager')
const { joinRequestManager } = require('../managers/join_request_manager')
const { messageManager } = require('../managers/message_manager')

const { Account } = require('../models/account')
const { Ride } = require('../models/ride')
const { JoinRequest } = require('../models/join_request')
const { Message } = require('../models/message')

var router = express.Router()

router.get('/', (req, res) => {
    var output = []
    var rides = rideManager.getAll(req.query.from, req.query.to, req.query.date)
    rides.map((ride)=>{
        output.push({
            rid: ride.rid,
            location_info: ride.location_info,
            date_time: ride.date_time
        })
    })
    return res.status(200).json(output)
})

router.post('/', (req, res) => {
    try {
        var account = accountManager.get(req.body.aid)
        if (!account.is_active) {
            throw "This account ("+ account.aid + ") is not active, may not create a ride."
        }
        var ride = new Ride(
            req.body.aid, 
            req.body.location_info, 
            req.body.date_time, 
            req.body.car_info, 
            req.body.max_passengers,
            req.body.amount_per_passenger,
            req.body.conditions
        )
        rideManager.add(ride)
    } catch (error) {
        return Validators.createValidationError(req, res, error)
    }
    return res.status(201).json({rid: ride.rid})
})

router.get('/:rid', (req, res) => {
    try {
        var ride = rideManager.get(req.params.rid)

    } catch (error) {
        return res.status(404).send(error)
    }
    try {
        var account = accountManager.get(ride.aid)
        var rides = rideManager.getByAid(account.aid).filter((ride)=>{
            var requests = joinRequestManager.getByRid(ride.rid)
            for(var i = 0; i < requests.length; i++){
                if(requests[i].ride_confirmed) return true
            }
            return false
        })
        var ratings = ratingManager.getRatings(account.aid, 'driver')

        var comment_detail = []
        for (var i = 0; i < ratings.length; i++) {
            rating = ratings[i]
            comment_detail.push({
                rid: rating.rid,
                date: rating.date_created,
                rating: rating.rating,
                comment: rating.comment
            })
        }

        res.status(200).json({
            rid: ride.rid,
            max_passengers: ride.max_passengers,
            amount_per_passenger: ride.amount_per_passenger,
            conditions: ride.conditions,
            location_info: ride.location_info,
            date_time: ride.date_time,
            car_info: ride.car_info,
            driver: account.first_name,
            driver_picture: account.picture,
            rides: rides.length,
            ratings: ratings.length,
            average_rating: ratingManager.getAverageRating(ratings),
            comments_about_driver: comment_detail
        })
    } catch (error) {
        console.log(error)
        return Validators.createValidationError(req, res, error)
    }
})

router.put('/:rid', (req, res) => {
    try {
        var ride = rideManager.get(req.params.rid)
    } catch(error) {
        return res.status(404).send(error)
    }
    try {
        if (req.body.aid != ride.aid) {
            throw "Only the creator of the ride may change it"
        }
        ride.update(
            req.body.aid, 
            req.body.location_info, 
            req.body.date_time, 
            req.body.car_info, 
            req.body.max_passengers,
            req.body.amount_per_passenger,
            req.body.conditions
        )
        return res.status(204).send()
    } catch (error) {
        return Validators.createValidationError(req, res, error)
    }
})

router.delete('/:rid', (req, res) => {
    try {
        var ride = rideManager.get(req.params.rid)
        rideManager.delete(ride.rid)
    } catch (error) {
        return res.status(404).send()
    }
    return res.status(204).send()
})

router.post('/:rid/join_requests', (req, res) => {
    try {
        var ride = rideManager.get(req.params.rid)
    } catch (error) {
        return res.status(404).send(error)
    }
    try {
        var account = accountManager.get(req.body.aid)
        
        if (req.body.ride_confirmed == true) {
            throw "Invalid value for ride_confirmed"
        }
        if (req.body.pickup_confirmed == true) {
            throw "Invalid value for pickup_confirmed"
        }
        if (!account.is_active) {
            throw "This account ("+ account.aid + ") is not active, may not create a join ride request."
        }
        
        var request = new JoinRequest(ride.rid, req.body.aid, req.body.passengers)
        joinRequestManager.add(request)

        res.set({
            'Location': '/rides/'+ride.rid+'/join_requests/'+request.jid
        })
        return res.status(201).send({jid: request.jid})
    } catch (error) {
        console.log(error)
        return Validators.createValidationError(req, res, error)
    }
})

router.patch('/:rid/join_requests/:jid', (req, res) => {
    try {
        var ride = rideManager.get(req.params.rid)
        var account = accountManager.get(req.body.aid)
        var request = joinRequestManager.get(req.params.jid)
        if (req.body.ride_confirmed != undefined) {
            if (ride.aid != account.aid) {
                throw "This account ("+account.aid+") didn't create the ride ("+ride.rid+")"
            }
            request.ride_confirmed = req.body.ride_confirmed
        }
        else if (req.body.pickup_confirmed != undefined) {
            if (request.aid != account.aid) {
                throw "This account ("+account.aid+") has not requested to join this ride ("+ride.rid+")"
            }
            if (!req.body.pickup_confirmed) {
                throw "Invalid value for pickup_confirmed"
            }
            request.pickup_confirmed = req.body.pickup_confirmed
        }
        else {
            throw "Invalid value for ride_confirmed"
        }
        return res.status(200).send()
    } catch (error) {
        console.log(error)
        return Validators.createValidationError(req, res, error)
    }
})

router.post('/:rid/messages', (req, res) => {
    try {
        var ride = rideManager.get(req.params.rid)
    } catch (error) {
        return res.status(404).send(error)
    }
    try {
        var account = accountManager.get(req.body.aid)
        if (!account.is_active) {
            throw "Account is not active"
        }
        var message = new Message(
            account.aid, 
            ride.rid,
            req.body.msg, 
            ride.date_time
        )
        messageManager.add(message)
        res.set({
            'Location': '/rides/'+ride.rid+'/messages/'+message.mid
        })
        return res.status(201).json({mid: message.mid})
    } catch (error) {
        console.log(error)
        return Validators.createValidationError(req, res, error)
    }
})

router.get('/:rid/messages', (req, res) => {
    try {
        var ride = rideManager.get(req.params.rid)
    } catch (error) {
        return res.status(404).send(error)
    }
    try {
        var messages = messageManager.getByRid(ride.rid)
        var output = []
        for (var i = 0; i < messages.length; i++) {
            var message = messages[i]
            output.push({
                mid: message.mid,
                sent_by_aid: message.aid,
                date: message.date_time.date + ", " + message.date_time.time,
                body: message.message
            })
        }
        return res.status(200).json(output)
    } catch (error) {
        console.log(error)
        return Validators.createValidationError(req, res, error)
    }
})

module.exports = router
