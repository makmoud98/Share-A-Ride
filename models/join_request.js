class JoinRequest {
    constructor(rid, aid, passengers) {
        this.pickup_confirmed = false
        this.ride_confirmed = false
        this.setRid(rid)
        this.setAid(aid)
        this.setPassengers(passengers)
    }

    setJid(jid) {
        this.jid = jid
    }

    setRid(rid) {
        this.rid = rid
    }

    setAid(aid) {
        this.aid = aid
    }

    setPassengers(passengers) {
        if (!passengers)
            throw "Invalid value for passengers"
        this.passengers = passengers
    }
}

module.exports.JoinRequest = JoinRequest