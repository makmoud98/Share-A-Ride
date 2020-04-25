var express = require('express')
const { check } = require('express-validator')
const { createValidationError } = require('../utils/validation_helper')
const { accountManager } = require('../account_manager')
const { Account } = require('../account')

var router = express.Router()

router.get('/', (req, res) => {
    var accounts = accountManager.getAll()
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

module.exports = router
