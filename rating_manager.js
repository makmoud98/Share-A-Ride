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

    static getAverageRating(ratings) {
        var count = ratings.length
        var total = 0
        ratings.map((rating)=>{
            total += rating.rating
        })
        return total/count
    }
}

module.exports.ratingManager = new RatingManager()
