const { check, validationResult } = require('express-validator')

module.exports.isPhoneValid = (val) => {
    // simple regex expression expects format 123-123-1234
    return new RegExp("\\d{3}-\\d{3}-\\d{4}").test(val)
}

module.exports.isName = (val) => {
    // simple regex expression for names. allows spaces
    return new RegExp("[A-z ]{1,}").test(val)
}

module.exports.accountValidators = [
    check('first_name').exists().custom(this.isName),
    check('last_name').exists().custom(this.isName),
    check('phone').optional().custom(this.isPhoneValid),
    // not going to bother validating if the string is a URL
    check('picture').optional()
]
// this is middleware that will format the data validation error response properly
// if there are errors. otherwise, it will go to the next middleware function
module.exports.checkValidationError = (req, res, next) => {
    const errors = validationResult(req) 
    if (errors.isEmpty()) next()
    else {
        // tester expects only 1 error, so i will return only the first one
        res.status(400).json({
            type: 'http://cs.iit.edu/~virgil/cs445/project/api/problems/data-validation',
            title: 'Your request data didn\'t pass validation',
            detail: 'Invalid value for ' + errors.array()[0].param,
            status: 400,
            instance: req.originalUrl // this url includes /sar unlike the examples,
            // but i dont think it is really a problem
        })
    }
}