const assert = require('assert')
const { AccountManager } = require('../managers/account_manager')
const { Account } = require('../models/account')
const { getAccountInstance } = require('./test_account')

describe('AccountManager', function() {
  describe('#constructor()', function() {
    it('should be an empty array of accounts', function(done) {
        var account_manager = new AccountManager()
        assert.equal(account_manager.accounts.length, 0)
        done()
    });
  });
  describe('#add()', function() {
    it('should contain new account after adding', function(done) {
        var account_manager = instance()
        var account = getAccountInstance()

        assert.equal(account_manager.accounts.length, 0)
        account_manager.add(account)
        assert.equal(account_manager.accounts.length, 1)
        assert.equal(account_manager.accounts[0], account)
        done()
    });
  });
  describe('#get()', function() {
    it('should get new account by aid after adding', function(done) {
        var account_manager = instance()
        var account = getAccountInstance()
        
        account_manager.add(account)

        assert.equal(account_manager.get(account.aid), account)
        done()
    });
    it('should throw error after get()ing non-existent aid', function(done) {
        var account_manager = instance()
        var account = new Account(
            'Michael',
            'Elnajami',
            '630-544-4352',
            'http://example.com/picture',
            false
            )
        account_manager.add(account)

        assert.throws(()=>{
            account_manager.get(5)
        }, undefined, 'aid doesnt exist')
        done()
    });
  });
});

function instance() {
    return new AccountManager()
}

module.exports.getAccountManagerInstance = instance
