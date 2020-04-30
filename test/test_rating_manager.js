const assert = require('assert');
const { RatingManager } = require('../managers/rating_manager')
const { RideManager } = require('../managers/ride_manager')
const { Ride } = require('../models/ride')
const { getRideInstance } = require('./test_ride')
const { getRatingInstance } = require('./test_rating')

describe('RatingManager', ()=>{
    describe('#constructor()', ()=>{
        it('should be an empty array of accounts', (done)=>{
            var rating_manager = instance()
            assert.equal(rating_manager.ratings.length, 0)
            done()
        })
    })
    describe('#add()', ()=>{
        it('should contain a new rating after adding', (done)=>{
            var rating_manager = instance()
            assert.equal(rating_manager.ratings.length, 0)
            var rating = getRatingInstance()
            rating_manager.add(rating)
            assert.equal(rating_manager.ratings.length, 1)
            var rating2 = getRatingInstance()
            rating_manager.add(rating2)
            assert.equal(rating_manager.ratings.length, 2)
            done()
        })
    })
    describe('#getRatings()', ()=>{
        it('should get ratings by aid', (done)=>{
            var rating_manager = instance()
            var rating = getRatingInstance()
            rating_manager.add(rating)

            assert.equal(rating_manager.getRatings(0).length, 1)

            var rating2 = getRatingInstance()
            rating2.aid = 1
            rating_manager.add(rating2)

            assert.equal(rating_manager.getRatings(0).length, 1)
            assert.equal(rating_manager.getRatings(1).length, 1)

            var rating3 = getRatingInstance()
            rating3.aid = 0
            rating_manager.add(rating3)

            assert.equal(rating_manager.getRatings(0).length, 2)
            done()
        })
        it('should throw an error upon using the wrong type', (done)=>{
            var rating_manager = instance()
            assert.throws(()=>{
                rating_manager.getRatings(0, 'passenger')
            }, undefined, "Invalid rating type. expected 'driver' or 'rider'")
            done()
        })
        it('should get ratings by aid and type', (done)=>{
            var rating_manager = instance()
            var rating = getRatingInstance()
            rating.aid = 0
            rating.rating_type = 'driver' // should use a setter to enfore valid value
            rating_manager.add(rating)
            assert.equal(rating_manager.getRatings(0, 'driver').length, 1)
            assert.equal(rating_manager.getRatings(0, 'rider').length, 0)
            var rating2 = getRatingInstance()
            rating2.aid = 0
            rating2.rating_type = 'driver'
            rating_manager.add(rating2)
            assert.equal(rating_manager.getRatings(0, 'driver').length, 2)
            done()
        })
    })
    describe('#getAverageRating()', ()=>{
        it('should properly calculate the average given an array of ratings', (done)=>{
            var rating_manager = instance()
            var rating = getRatingInstance()
            rating.rating_type = 'driver' // should use a setter to enfore valid value
            rating.rating = 1
            rating_manager.add(rating)
            
            var rating2 = getRatingInstance()
            rating2.rating_type = 'driver' // should use a setter to enfore valid value
            rating2.rating = 5
            rating_manager.add(rating2)

            assert.equal(rating_manager.getAverageRating(rating_manager.ratings), 3)
            done()
        })
    })
})

function instance() {
    return new RatingManager()
}

module.exports.getRatingManagerInstance = instance