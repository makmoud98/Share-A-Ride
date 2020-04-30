const assert = require('assert')
const { Message } = require('../models/message')

describe('Message', ()=>{
    describe('#constructor', ()=>{
        it('should initalize values', (done)=>{
            var message = instance()
            assert.notEqual(message.aid, undefined)
            assert.notEqual(message.rid, undefined)
            assert.notEqual(message.message, undefined)
            assert.notEqual(message.date_time, undefined)
            done()
        })
    })
    describe('#setMid', ()=>{
        it('should update values', (done)=>{
            var message = instance()
            message.setMid(5)
            assert.equal(message.mid, 5)
            done()
        })
    })
})

function instance() {
    return new Message(
            0, 
            0, 
            "Hi, I'm outside!",
            {
                date: '14-Apr-2020',
                time: '09:00'
            }
        )
}

module.exports.getMessageInstance = instance