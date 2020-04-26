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
    try {
        var output = []
        var rides = rideManager.getAll(req.query.from, req.query.to, req.query.date)
        for (var i = 0; i < rides.length; i++) {
            var ride = rides[i]
            output.push({
                rid: ride.rid,
                location_info: ride.location_info,
                date_time: ride.date_time
            })
        }
    } catch (error) {
        console.log(error)
        return createValidationError(req, res, error)
    }
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
        console.log(error)
        return createValidationError(req, res, error)
    }
    return res.status(201).json({rid: ride.rid})
})

router.get('/:rid') {
    try {
        var ride = rideManager.get(req.params.rid)
        var account = accountManager.get(ride.aid)
        var rides = rideManager.getByAid(account.aid)
        var ratings = ratingManager.getRatings(account.aid, 'driver')
    } catch (error) {
        return res.status(404).send(error)
    }
    try {
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

        res.send(200).json({
            rid: ride.rid,
            location_info: ride.location_info,
            date_time: ride.date_time,
            car_info: ride.car_info,
            driver: account.first_name,
            picture: account.picture,
            rides: rides.length,
            ratings: ratings.length,
            average_rating: ratingManager.getAverageRating(ratings)
            comments_about_driver: comment_detail
        })
    }
}

module.exports = router
