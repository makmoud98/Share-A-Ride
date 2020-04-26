class RatingManager {
    constructor() {
        this.ratings = []
    }

    add(rating) {
        rating.setSid(this.ratings.length)
        this.ratings.push(rating)
    }

    getRatings(aid, type) {
        if (type != undefined || type != 'driver' || type != 'rider')
            throw "Invalid rating type. expected 'driver' or 'rider'"
        var ratings = this.ratings.filter((rating) => {
            if (rating.aid == aid && rating.rider_type == type) return true
        })
        return ratings
    }
}

module.exports.ratingManager = new RatingManager()
