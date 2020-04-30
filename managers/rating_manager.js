class RatingManager {
    constructor() {
        this.ratings = []
    }

    add(rating) {
        rating.setSid(this.ratings.length)
        this.ratings.push(rating)
    }

    getRatings(aid, type) {
        if (type && type != 'driver' && type != 'rider')
            throw "Invalid rating type. expected 'driver' or 'rider'"
        var ratings = this.ratings.filter((rating) => {
            if (
                rating.aid == aid && 
                (
                    !type ||
                    rating.rating_type == type
                )
            ) return true
        })
        return ratings
    }

    getAverageRating(ratings) {
        var count = ratings.length
        var total = 0
        ratings.map((rating)=>{
            total += rating.rating
        })
        return total/count
    }
}

module.exports.ratingManager = new RatingManager()
module.exports.RatingManager = RatingManager;
