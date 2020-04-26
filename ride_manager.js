class RideManager {
    constructor() {
        this.rides = []
    }
    getAll() {
        return this.rides
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
}


module.exports.rideManager = new RideManager()
