const { validationResult } = require('express-validator')

module.exports.isPhoneValid = (val) => {
    // simple regex expression expects format 123-123-1234
    return '\d{3}-\d{3}-\d{4}'.test(val)
}
// this is middleware that will format the data validation error response properly
// if there are errors. otherwise, it will go to the next middleware function
module.exports.checkValidationError = (req, res, next) => {
    const errors = validationResult(req) 
    if (errors.isEmpty()) {
        next()
    }
    else {
        // tester expects only 1 error, so i will return only the first one
        res.status(400).json({
            type: 'http://cs.iit.edu/~virgil/cs445/project/api/problems/data-validation',
            title: 'Your request data didn\'t pass validation',
            detail: errors.array()[0].msg,
            status: 400,
            instance: req.url
        })
    }
}