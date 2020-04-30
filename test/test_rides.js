const assert = require('assert')
var request = require('supertest');
var app = require('../app')

const { accountManager } = require('../managers/account_manager')
const { rideManager } = require('../managers/ride_manager')
const { joinRequestManager } = require('../managers/join_request_manager')
const { getAccountInstance } = require('./test_account')
const { getRideInstance } = require('./test_ride')
const { getJoinRequestInstance } = require('./test_join_request')


describe("Rides", () => {
    describe("GET /", () => {
        it("should return 200", (done) => {
            request(app)
                .get('/sar/rides/')
                .expect(200, done) 
        })
        it("should work with a keyword", (done) => {
            var account = getAccountInstance()
            accountManager.add(account)

            request(app)
                .get('/sar/rides/?from=Chicago')
                .expect(200, done) 
        })
    })
    describe("POST /", () => {
        var account = getAccountInstance()
        accountManager.add(account)
        it("should return 400 upon failed data-validation", (done) => {
            var account = getAccountInstance()
            accountManager.add(account)

            request(app)
                .post('/sar/rides/')
                .send({
                    "aid": account.aid,
                    "max_passengers": 2,
                    "amount_per_passenger": 15.00,
                    "conditions": "No more than one carry on per passenger. No pets."
                  })
                .expect(400, done) 
        })
        it("should return 201 on success", (done) => {
            request(app)
                .post('/sar/rides/')
                .send({
                    "aid": account.aid,
                    "location_info": {
                        "from_city": "Barrington",
                        "from_zip": "60010",
                        "to_city": "Milwaukee",
                        "to_zip": "53202"
                    },
                    "date_time": {
                        "date": "14-Apr-2020",
                        "time": "09:00"
                    },
                    "car_info": {
                        "make": "Audi",
                        "model": "A4",
                        "color": "Gray",
                        "plate_state": "IL",
                        "plate_serial": "COVID19"
                    },
                    "max_passengers": 2,
                    "amount_per_passenger": 15.00,
                    "conditions": "No more than one carry on per passenger. No pets."
                })
                .expect(201, done) 
        })
    })
    describe("GET /rid/", () => {
        var ride = getRideInstance()
        rideManager.add(ride)
        it("should return 200 upon ride found", (done) => {
            request(app)
                .get('/sar/rides/'+ride.rid)
                .expect(200, done) 
        })
        it("should return 404 upon ride not found", (done) => {
            request(app)
                .get('/sar/rides/1000')
                .expect(404, done) 
        })
    })
    describe("PUT /rid/", () => {
        var ride = getRideInstance()
        ride.setAid(0)
        rideManager.add(ride)
        it("should return 204 upon successful update", (done) => {
            request(app)
                .put('/sar/rides/'+ride.rid)
                .send({ 
                    "aid": 0,
                    "location_info": {
                        "from_city": "Barrington",
                        "from_zip": "60010",
                        "to_city": "Milwaukee",
                        "to_zip": "53202"
                    },
                    "date_time": {
                        "date": "14-Apr-2020",
                        "time": "09:30"
                    },
                    "car_info": {
                        "make": "Audi",
                        "model": "A4",
                        "color": "Gray",
                        "plate_state": "IL",
                        "plate_serial": "COVID19"
                    },
                    "max_passengers": 2,
                    "amount_per_passenger": 15.00,
                    "conditions": "No more than one carry-on per passenger. No pets."
                })
                .expect(204, done) 
        })
        it("should return 404 upon ride not found", (done) => {
            request(app)
                .put('/sar/rides/1000')
                .expect(404, done) 
        })
    })
    describe("DELETE /rid/", () => {
        var ride = getRideInstance()
        rideManager.add(ride)
        it("should return 204 upon successful update", (done) => {
            request(app)
                .delete('/sar/rides/'+ride.rid)
                .expect(204, done) 
        })
        it("should return 404 upon ride not found", (done) => {
            request(app)
                .delete('/sar/rides/1000')
                .expect(404, done) 
        })
    })
    describe("POST /rid/join_requests", () => {
        var ride = getRideInstance()
        var account = getAccountInstance()
        accountManager.add(account)
        account.is_active = true
        rideManager.add(ride)
        it("should return 201 upon successful update", (done) => {
            request(app)
                .post('/sar/rides/'+ride.rid+'/join_requests')
                .send({
                    "aid": account.aid,
                    "passengers": 2,
                    "ride_confirmed": null,
                    "pickup_confirmed": null
                })
                .expect('Location', /.*/)
                .expect(201, done) 
        })
        it("should return 400 upon failed data-validation", (done) => {
            request(app)
                .post('/sar/rides/'+ride.rid+'/join_requests')
                .send({
                    "aid": account.aid,
                    "passengers": 2,
                    "ride_confirmed": null,
                    "pickup_confirmed": true
                })
                .expect(400, done)
        })
        it("should return 404 upon ride not found", (done) => {
            request(app)
                .post('/sar/rides/1000/join_requests')
                .expect(404, done) 
        })
    })
    describe("PATCH /rid/join_requests/jid", () => {
        var ride = getRideInstance()
        var account = getAccountInstance()
        accountManager.add(account)
        account.is_active = true
        rideManager.add(ride)
        ride.aid = account.aid

        it("should return 200 upon successful driver confirmation", (done) => {
            request(app)
                .patch('/sar/rides/'+ride.rid+'/join_requests/0')
                .send({
                    "aid": account.aid,
                    "passengers": 2,
                    "ride_confirmed": true
                })
                .expect(200, done) 
        })
        it("should return 200 upon successful rider confirmation", (done) => {
            request(app)
                .patch('/sar/rides/'+ride.rid+'/join_requests/0')
                .send({
                    "aid": joinRequestManager.get(0).aid,
                    "passengers": 2,
                    "pickup_confirmed": true
                })
                .expect(200, done) 
        })
        it("should return 400 upon failed data-validation", (done) => {
            request(app)
                .patch('/sar/rides/'+ride.rid+'/join_requests/0')
                .send({
                    "aid": 1000,
                    "passengers": 2,
                    "ride_confirmed": true
                })
                .expect(400, done)
        })
    })
    describe('POST /rid/messages', ()=>{
        var ride = getRideInstance()
        var account = getAccountInstance()
        accountManager.add(account)
        account.is_active = true
        rideManager.add(ride)
        ride.aid = 0
        it("should return 200 upon success", (done) => {
            request(app)
                .post('/sar/rides/'+ride.rid+'/messages')
                .send({
                    "aid": account.aid,
                    "msg": "One passenger; could you pick me up at the Starbucks in Barrington at Main and Hough?"
                })
                .expect('Location', /.*/)
                .expect(201, done) 
        })
        it("should return 404 upon ride not found", (done) => {
            request(app)
                .post('/sar/rides/1000/messages')
                .expect(404, done) 
        })
    })
    describe('GET /rid/messages', ()=>{
        it("should return 200 upon success", (done) => {
            request(app)
                .get('/sar/rides/0/messages')
                .expect(200, done) 
        })
        it("should return 404 upon ride not found", (done) => {
            request(app)
                .get('/sar/rides/1000/messages')
                .expect(404, done) 
        })
    })
})