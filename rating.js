class Rating {
    constuctor(ride, aid, sent_by_id, rating, comment) {
        this.setRide(ride)
        this.setAid(aid)
        this.setSentAid(sent_by_id)
        this.setRating(rating)
        this.setComment(comment)
        this.setDateCreated()
    }

    setDateCreated() {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
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
        this.ride = ride
        this.setRiderType()
    }

    setRiderType() {
        // will throw an error if the id doesnt exists
        var ride = this.ride

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
