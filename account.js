const { Validators } = require("./validators")

class Account {
    constructor(first_name, last_name, phone, picture, is_active) {
        this.setDateCreated()
        this.update(first_name, last_name, phone, picture, is_active)
    }

    update(first_name, last_name, phone, picture, is_active) {
        this.setFirstName(first_name)
        this.setLastName(last_name)
        this.setPhoneNumber(phone)
        this.setPicture(picture)
        this.setActive(is_active)
    }

    getFullName() {
        return this.first_name + ' ' + this.last_name
    }

    setDateCreated() {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        this.date_created = date+', '+time;
    }

    setAid(aid) {
        this.aid = aid
    }

    setFirstName(first_name) {
        if (first_name == undefined) {
            throw "Invalid value for first_name"
        }
        if (!Validators.isName(first_name)) {
            throw "The first name appears to be invalid."
        }
        this.first_name = first_name
    }

    setLastName(last_name) {
        if (last_name == undefined) {
            throw "Invalid value for last_name"
        }
        if (!Validators.isName(last_name)) {
            throw "The last name appears to be invalid."
        }
        this.last_name = last_name   
    }

    setPhoneNumber(phone) {
        if (phone == undefined) return
        if (!Validators.isPhoneNumber(phone)) {
            throw "Invalid phone number"
        }
        this.phone = phone
    }

    setPicture(picture) {
        if (picture == undefined) return
        this.picture = picture
    }

    setActive(is_active) {
        if (is_active == undefined) return
        this.is_active = is_active
    }
}

module.exports.Account = Account
