const assert = require('assert');
const { MessageManager } = require('../managers/message_manager')
const { getMessageInstance } = require('./test_message')

describe('MessageManager', ()=>{
    describe('#constructor', ()=>{
        it('should start with no messages', (done)=>{
            var messageManager = instance()
            assert.equal(messageManager.messages.length, 0)
            done()
        })
    })
    describe('#add()', ()=>{
        it('should contain a new message after adding', (done)=>{
            var messageManager = instance()
            var message = getMessageInstance()
            assert.equal(messageManager.messages.length, 0)
            messageManager.add(message)
            assert.equal(messageManager.messages.length, 1)
            var message2 = getMessageInstance()
            messageManager.add(message2)
            assert.equal(messageManager.messages.length, 2)
            done()
        })   
    })
    describe('#get()', ()=>{
        it('should retrive a message given its mid', (done)=>{
            var messageManager = instance()
            var message = getMessageInstance()
            messageManager.add(message)
            assert.equal(messageManager.get(message.mid), message)
            done()
        })
        it('should throw an error upon no message found', (done)=>{
            var messageManager = instance()
            assert.throws(()=>{
                messageManager.get(5)
            }, undefined, "Message with given mid not found")
            done()
        })
    })
    describe('#getByRid()', ()=>{
        it('should retrive an array of messages about a rid', (done)=>{
            var messageManager = instance()
            var message = getMessageInstance()
            assert.equal(messageManager.getByRid(message.rid).length, 0)
            messageManager.add(message)
            assert.equal(messageManager.getByRid(message.rid).length, 1)
            var message2 = getMessageInstance()
            messageManager.add(message2)
            assert.equal(messageManager.getByRid(message2.rid).length, 2)
            done()
        })
    })
})

function instance() {
    return new MessageManager()
}

module.exports.getMessageManagerInstance = instance