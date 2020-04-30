const assert = require('assert')
const { JoinRequest } = require('../models/join_request')

describe('JoinRequest', ()=>{
    describe('#constructor', ()=>{
        it('should initalize values', (done)=>{
            var request = instance()
            assert.notEqual(request.rid, undefined)
            assert.notEqual(request.aid, undefined)
            assert.notEqual(request.passengers, undefined)
            done()
        })
    })
    describe('#setPassengers', ()=>{
        it('should throw an error upon an empty or null value', (done)=>{
            var request = instance()
            assert.throws(()=>{
                request.setPassengers()
            }, undefined, 'Invalid value for passengers');
            assert.throws(()=>{
                request.setPassengers('')
            }, undefined, 'Invalid value for passengers');
            assert.throws(()=>{
                request.setPassengers(undefined)
            }, undefined, 'Invalid value for passengers');
            done()
        })
    })
})

function instance() {
    return new JoinRequest(0,0,2)
}

module.exports.getJoinRequestInstance = instance