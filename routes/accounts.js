var express = require('express')
const { check } = require('express-validator')
const { isPhoneValid, checkValidationError } = require('../utils/validation_helper.js')

var router = express.Router()

router.post('/',
    check('first_name').exists().isLength({min: 1}),
    check('last_name').exists().isLength({min: 1}),
    check('phone_number').isLength(12).custom(isPhoneValid),
    check('picture'),//not going to both validating if the string is a URL
    check('is_active').custom((val) => {return val == false}),
    checkValidationError,
    (req, res) => {
        // all data is valid, so now create the user
        return res.status(200).json({aid: 1})
    })

module.exports = router
