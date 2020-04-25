var express = require('express')
const { check } = require('express-validator')
const { accountValidators, checkValidationError } = require('../utils/validation_helper')
const { accountManager } = require('../account_manager')

var router = express.Router()

router.post('/',
    accountValidators,
    check('is_active').optional().custom((val) => {return val == false}),
    checkValidationError,
    (req, res) => {
        // all data is valid, so now create the user
        // req.body is basically the body of the post request
        // it will have all the validated attributes
        var account = accountManager.add(req.body)
        return res.status(201).json({aid: account.aid})
    })

router.put('/:aid',
    accountValidators,
    check('is_active').custom((val) => {return val == false}),
    checkValidationError,
    (req, res) => {
        var account = accountManager.update(req.params.aid, req.body)
        if(account) return res.status(204).send()
        else return res.status(404).send()
    })

router.put('/:aid/status',
    accountValidators,
    check('is_active').custom((val) => {return val == true}),
    checkValidationError,
    (req, res) => {
        var account = accountManager.get(req.params.aid)
        if(account) return res.status(204).send()
        else return res.status(404).send()
    })

router.delete('/:aid',
    (req, res) => {
        var success = accountManager.delete(req.params.aid)
        if (success) return res.status(204).send()
        else return res.status(404).send()
    })

module.exports = router
