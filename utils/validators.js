class Validators {
    constructor () {}

    static isName(name) {
        return new RegExp("[A-z ]{1,}").test(name)
    }

    static isPhoneNumber(num) {
        return new RegExp("\\d{3}-\\d{3}-\\d{4}").test(num)
    }

    static isDate(date) {
        return true
    }

    static isTime(time) {
        return true
    }

    static createValidationError(req, res, message) {
        return res.status(400).json({
            type: 'http://cs.iit.edu/~virgil/cs445/project/api/problems/data-validation',
            title: 'Your request data didn\'t pass validation',
            detail: message,
            status: 400,
            instance: Validators.getInstanceUrl(req) // this url includes /sar unlike the examples,
            // but i dont think it is really a problem
        })
    }

    static getInstanceUrl(req) {
        // fix the begenning of the path
        var base = req.baseUrl.split('/')
        base = base[base.length-1]
        var url = '/' + base + req.path
        if (url.endsWith('/')) url = url.slice(0,-1)
        return url
    }
}

module.exports.Validators = Validators
