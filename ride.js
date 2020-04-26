class Ride {
    constructor(aid, location_info, date_time, car_info, max_passengers, ammount_per_passenger, conditions) {
        this.passengers = []
        this.setAid(aid)
        this.setLocation(location_info)
        this.setDateTime(date_time)
        this.setCarInfo(car_info)
        this.setAmountPerPassenger(ammount_per_passenger)
        this.setConditions(conditions)
    }

    setAid(aid) {
        this.aid = aid
    }

    setLocation(location_info) {
        if (
            location_info == undefined ||
            location_info.from_city == undefined ||
            location_info.to_city == undefined
        ) {
            throw "Invalid value for location_info"
        }
        this.location_info = location_info
    }

    setDateTime(date_time) {
        if (
            date_time == undefined ||
            date_time.date == undefined || 
            date_time.time == undefined ||
            !Validators.isDate(date_time.date) || 
            !Validators.isTime(date_time.time)
        ) {
            throw "Invalid value for date_time"
        }

    }

    setCarInfo(car_info) {
        if (
            car_info == undefined ||
            car_info.make == undefined ||
            car_info.model == undefined ||
            car_info.color == undefined ||
            car_info.plate_state == undefined ||
            car_info.plate_serial == undefined
        ) {
            throw "Invalid value for car_info"
        }
    }

    setMaxPassengers(max_passengers) {
        if (max_passengers == undefined) {
            throw "Invalid value for max_passengers"
        }
    }

    setAmmountPerPassenger(ammount_per_passenger) {
        if (ammount_per_passenger == undefined) {
            throw "Invalid value for ammount_per_passenger"
        }
    }

    setConditions(conditions) {
        if (conditions == undefined) {
            throw "Invalid value for conditions"
        }
    }
}