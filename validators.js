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
}

module.exports.Validators = Validators
