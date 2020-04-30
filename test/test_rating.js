const assert = require('assert')
const { Rating } = require('../models/rating')

describe('Rating', ()=>{
    describe('#constructor', ()=>{
        it('should initalize values', (done)=>{
            var rating = instance()
            assert.notEqual(rating.rid, undefined)
            assert.notEqual(rating.aid, undefined)
            assert.notEqual(rating.sent_by_id, undefined)
            assert.notEqual(rating.rating, undefined)
            assert.notEqual(rating.comment, undefined)
            assert.notEqual(rating.date_created, undefined)
            done()
        })
    })
    describe('#setDateCreated', ()=>{
        it('should not allow undefined', (done)=>{
            var rating = instance()
            assert.throws(()=>{
                rating.setDateCreated()
            }, undefined, "Invalid value for date")
            done()
        })
    })
    describe('#setRating', ()=>{
        it('should not allow undefined', (done)=>{
            var rating = instance()
            assert.throws(()=>{
                rating.setRating()
            }, undefined, "Invalid value for rating")
            done()
        })
    })
    describe('#setComment', ()=>{
        it('should not allow undefined', (done)=>{
            var rating = instance()
            assert.throws(()=>{
                rating.setComment()
            }, undefined, "Invalid value for comment")
            done()
        })
    })
})

function instance() {
    return new Rating(
        0,
        0,
        1,
        5,
        'great experience',
        '14-Apr-2020'
        )
}

module.exports.getRatingInstance = instance