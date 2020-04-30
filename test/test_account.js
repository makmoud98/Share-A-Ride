const assert = require('assert')
const { Account } = require('../models/account')

describe('Account', ()=>{
    describe('#constructor', ()=>{
        it('should set date created', (done)=>{
            var account = instance()
            assert(account.date_created)
            done()
        })
    })
    describe('#update', ()=>{
        it('should update values', (done)=>{
            var account = instance()
            account.update('John', 'Doe', '312-123-7889')
            assert.equal(account.first_name, 'John')
            assert.equal(account.last_name, 'Doe')
            assert.equal(account.phone, '312-123-7889')
            done()
        })
    })
    describe('#getFullName', ()=>{
        it('should combine the first and last name into a full name', (done)=>{
            var account = instance()
            assert.equal(account.getFullName(), 'Michael Elnajami')
            done()
        })
    })
    describe('#setFirstName', ()=>{
        it('throws errors upon wrong entries', (done)=>{
            var account = instance()
            assert.throws(()=>{
                account.setFirstName('123')
            }, undefined, 'The first name appears to be invalid.')
            assert.throws(()=>{
                account.setFirstName()
            }, undefined, 'Invalid value for first_name')
            done()
        })
    })
    describe('#setLastName', ()=>{
        it('throws errors upon wrong entries', (done)=>{
            var account = instance()
            assert.throws(()=>{
                account.setLastName('')
            }, undefined, 'The last name appears to be invalid.')
            assert.throws(()=>{
                account.setLastName()
            }, undefined, 'Invalid value for last_name')
            done()
        })
    })
    describe('#setPhoneNumber', ()=>{
        it('throws errors upon wrong entries', (done)=>{
            var account = instance()
            assert.throws(()=>{
                account.setPhoneNumber('123321321')
            }, undefined, 'Invalid phone number')
            assert.throws(()=>{
                account.setPhoneNumber('312-1231234')
            }, undefined, 'Invalid phone number')
            done()
        })
    })
})

function instance() {
    return new Account(
        'Michael',
        'Elnajami',
        '630-544-4352',
        'http://example.com/picture',
        false
        )
}

module.exports.getAccountInstance = instance
