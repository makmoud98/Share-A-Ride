class Rating {
    constructor(ride, aid, sent_by_id, rating, comment, date) {
        this.setRide(ride)
        this.setAid(aid)
        this.setSentAid(sent_by_id)
        this.setRating(rating)
        this.setComment(comment)
        this.setDateCreated(date)
    }

    setSid(sid) {
        this.sid = sid
    }

    setDateCreated(date) {
        this.date_created = date;
    }

    setSentAid(sent_by_id) {
        this.sent_by_id = sent_by_id
    }

    setAid(aid) {
        this.aid = aid
    }

    setRideManager() {
        this.rideManager = rideManager
    }

    setRide(ride) {
        this.rid = ride.rid
        this.setRiderType(ride)
    }

    setRiderType(ride) {
        // is rating from the driver?
        if(ride.driver_aid == this.sent_by_id) {
            this.rider_type = 'driver'
        }
        // is rating from the passenger?
        else {
            var found = false
            for(var i = 0; i < ride.passengers.length; i++) {
                var passenger = ride.passengers[i]
                if (passenger.aid == sent_by_id) found = true
            }
            if (!found) {
                throw "This account (" + this.sent_by_id + ") did't create this ride (" + this.rid + ") nor was it a passenger"
            }
            else {
                this.rider_type = 'rider'
            }
        }
    }

    setRating(rating) {
        if(rating == undefined) {
            throw "Invalid value for rating"
        }
        this.rating = rating
    }

    setComment(comment) {
        if(comment == undefined) {
            throw "Invalid value for comment"
        }
        this.comment = comment
    }
}

module.exports.Rating = Rating