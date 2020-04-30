class Rating {
    constructor(rid, aid, sent_by_id, rating, comment, date) {
        this.setRid(rid)
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
        if(date == undefined) {
            throw "Invalid value for date"
        }
        this.date_created = date;
    }

    setSentAid(sent_by_id) {
        this.sent_by_id = sent_by_id
    }

    setAid(aid) {
        this.aid = aid
    }

    setRid(rid) {
        this.rid = rid
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