const { Validators } = require("../utils/validators")

class RideManager {
    constructor() {
        this.rides = []
    }
    getAll(from, to, date) {
        var matches = this.rides.filter((ride)=>{
            if(
                (
                    !from ||
                    ride.location_info.from_city.toLowerCase() == from.toLowerCase()
                ) &&
                (
                    !to ||
                    ride.location_info.to_city.toLowerCase() == to.toLowerCase()
                ) &&
                (
                    !date ||
                    ride.date_time.date == date
                )
            ) {
                return true
            }
        })
        return matches
    }
    getByAid(aid) {
        var matches = this.rides.filter((ride)=>{
            if(ride.aid == aid) return true
        })
        return matches
    }
    add(ride) {
        ride.setRid(this.rides.length)
        this.rides.push(ride)
    }
    get(rid) {
        for(var i = 0; i < this.rides.length; i++) {
            if(this.rides[i].rid == rid) {
                return this.rides[i]
            }
        }
        throw "rid doesnt exist"
    }
    update(rid, ride) {
        for(var i = 0; i < this.rides.length; i++) {
            if(this.rides[i].rid == rid) {
                this.rides[i] = ride
                return
            }
        }
        throw "rid doesnt exist"
    }
    delete(rid) {
        for(var i = 0; i < this.rides.length; i++) {
            if(this.rides[i].rid == rid) {
                this.rides.splice(i, 1)
            }
        }
    }
}

module.exports.rideManager = new RideManager()
