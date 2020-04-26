class Validators {
    constructor () {}

    static isName(name) {
        return new RegExp("[A-z ]{1,}").test(name)
    }

    static isPhoneNumber(num) {
        return new RegExp("\\d{3}-\\d{3}-\\d{4}").test(num)
    }
}

module.exports.Validators = Validators
