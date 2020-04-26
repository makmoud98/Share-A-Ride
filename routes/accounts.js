var express = require('express')
const { check } = require('express-validator')
const { createValidationError } = require('../utils/validation_helper')
const { accountManager } = require('../account_manager')
const { rideManager } = require('../ride_manager')
const { ratingManager } = require('../rating_manager')
const { Account } = require('../account')
const { Ride } = require('../ride')

var router = express.Router()

router.get('/', (req, res) => {
    var keyword = req.query.key
    var accounts = accountManager.getAll().filter((account)=>{
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
    if (req.body.is_active == true) {
        return createValidationError(req, res, "Invalid value for is_active")
    }
    try {
        var account = new Account(
            req.body.first_name, 
            req.body.last_name, 
            req.body.phone, 
            req.body.picture, 
            req.body.is_active
        )
        accountManager.add(account)
    } catch (error) {
        return createValidationError(req, res, error)
    }
    return res.status(201).json({aid: account.aid})
})

router.put('/:aid', (req, res) => {
    try {
        var account = accountManager.get(req.params.aid)
        console.log(account)
        account.update(
            req.body.first_name, 
            req.body.last_name, 
            req.body.phone, 
            req.body.picture, 
            req.body.is_active
        )
        accountManager.update(req.params.aid, account)
    } catch (error) {
        console.log(error)
        return createValidationError(req, res, error)
    }
    return res.status(204).send()
})

router.put('/:aid/status', (req, res) => {
    if (req.body.is_active != true) {
        return createValidationError(req, res, "Invalid value for is_active")
    }
    try {
        var account = accountManager.get(req.params.aid)
        console.log(account)
        account.update(
            req.body.first_name, 
            req.body.last_name, 
            req.body.phone, 
            req.body.picture, 
            req.body.is_active
        )
        accountManager.update(req.params.aid, account)
    } catch (error) {
        console.log(error)
        return createValidationError(req, res, error)
    }
    return res.status(204).send()
})

router.post('/:aid/ratings', (req, res) => {
    try {
        var account = accountManager.get(req.params.aid)
        var ride = rideManager.get(req.body.rid)
        var rater = accountManager.get(req.body.sent_by_id)
        var rating = new Rating(
            ride,
            account.aid,
            rater.aid,
            req.body.rating,
            req.body.comment
        )
        ratingManager.add(rating)

    } catch (error) {
        console.log(error)
        return createValidationError(req, res, error)
    }
    return res.status(201).send()
})

router.get('/:aid/:rider_type', (req, res) => {
    try {
        var account = accountManager.get(req.params.aid)
        var ratings = ratingManager(account.aid, req.params.rider_type)

        var detail = []
        var average_rating = 0
        for (var i = 0; i < ratings.length; i++) {
            rating = ratings[i]
            detail.push({
                rid: rating.aid,
                sent_by_id: rating.sent_by_id,
                first_name: accountManager.get(rating.sent_by_id).getFullName(),
                date: rating.date_created,
                rating: rating.rating,
                comment: rating.comment
            })
            average_rating += rating.rating
        }
        average_rating /= detail.length

        return res.status(200).json({
            aid: account.aid,
            first_name: account.first_name,
            rides: detail.length,
            average_rating: average_rating,
            detail: detail
        })
    } catch (error) {
        console.log(error)
        return createValidationError(req, res, error)
    }
})

module.exports = router
