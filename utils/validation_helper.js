const { check, validationResult } = require('express-validator')

module.exports.createValidationError = (req, res, message) => {
    res.status(400).json({
        type: 'http://cs.iit.edu/~virgil/cs445/project/api/problems/data-validation',
        title: 'Your request data didn\'t pass validation',
        detail: message,
        status: 400,
        instance: getInstanceUrl(req) // this url includes /sar unlike the examples,
        // but i dont think it is really a problem
    })
}

// this function is a crappy hack I had to create in order to get a good looking instance url
// the req.path variable tries to url encode { and } characters which results in %7B and %7D in the string
// the stuff with the base url are because otherwise it will also have /sar/ in the url
function getInstanceUrl(req) {

    // fix the begenning of the path
    base = req.baseUrl.split('/')
    base = base[base.length-1]
    url = '/' + base + req.path
    if (url.endsWith('/')) url = url.slice(0,-1)
    return url
}