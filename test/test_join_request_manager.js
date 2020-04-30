const assert = require('assert');
const { JoinRequestManager } = require('../managers/join_request_manager')
const { getJoinRequestInstance } = require('./test_join_request')

describe('JoinRequestManager', ()=>{
    describe('#constructor', ()=>{
        it('should contain 0 requests', (done)=>{
            var joinRequestManager = instance()
            var request = getJoinRequestInstance()

            assert.equal(joinRequestManager.requests.length, 0)

            done()
        })
    })
    describe('#add', ()=>{
        it('should contain a request after adding', (done)=>{
            var joinRequestManager = instance()
            var request = getJoinRequestInstance()

            assert.equal(joinRequestManager.requests.length, 0)

            joinRequestManager.add(request)

            assert.equal(joinRequestManager.requests.length, 1)
            done()
        })
    })
    describe('#get', ()=>{
        it('should retrive a join request given a jid', (done)=>{
            var joinRequestManager = instance()
            var request = getJoinRequestInstance()
            joinRequestManager.add(request)
            
            assert.equal(joinRequestManager.get(request.jid), request)
            done()
        })
    })
    describe('#getByAid', ()=>{
        it('should get an array of requests that match a specified aid', (done)=>{
            var joinRequestManager = instance()
            var request = getJoinRequestInstance()
            request.aid = 0
            
            assert.equal(joinRequestManager.getByAid(0).length, 0)
            
            joinRequestManager.add(request)

            assert.equal(joinRequestManager.getByAid(0).length, 1)

            var request2 = getJoinRequestInstance()
            request2.aid = 0
            joinRequestManager.add(request2)

            assert.equal(joinRequestManager.getByAid(0).length, 2)
            done()
        })
    })
    describe('#getByRid', ()=>{
        it('should get an array of requests that match a specified rid', (done)=>{
            var joinRequestManager = instance()
            var request = getJoinRequestInstance()
            request.rid = 0
            
            assert.equal(joinRequestManager.getByRid(0).length, 0)
            
            joinRequestManager.add(request)

            assert.equal(joinRequestManager.getByRid(0).length, 1)

            var request2 = getJoinRequestInstance()
            request2.rid = 0
            joinRequestManager.add(request2)

            assert.equal(joinRequestManager.getByRid(0).length, 2)
            done()
        })
    })
})

function instance() {
    return new JoinRequestManager()
}

module.exports.getJoinRequestManagerInstance = instance