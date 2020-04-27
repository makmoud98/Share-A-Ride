class Message {
    constructor(aid, rid, msg, date_time) {
        this.aid = aid
        this.rid = rid
        this.message = msg
        this.date_time = date_time
    }

    setMid(mid) {
        this.mid = mid
    }
}

module.exports.Message = Message