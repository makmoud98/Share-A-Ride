const assert = require('assert')
var request = require('supertest');
var app = require('../app')

const { accountManager } = require('../managers/account_manager')
const { rideManager } = require('../managers/ride_manager')
const { joinRequestManager } = require('../managers/join_request_manager')
const { getAccountInstance } = require('./test_account')
const { getRideInstance } = require('./test_ride')
const { getJoinRequestInstance } = require('./test_join_request')


describe("Accounts", () => {
    describe("GET /", () => {
        it("should return 200", (done) => {
            request(app)
                .get('/sar/accounts/')
                .expect(200, done) 
        })
        it("should work with a keyword", (done) => {
            var account = getAccountInstance()
            accountManager.add(account)

            request(app)
                .get('/sar/accounts/?key=John')
                .expect(200, done) 
        })
    })
    describe('POST /', ()=>{
        it("should return 201 on success", (done) => {
            request(app)
                .post('/sar/accounts/')
                .send({
                    "first_name": "Johnny",
                    "last_name": "Test",
                    "phone": "312-456-7890",
                    "picture": "http://example.com/images/john-smith.jpeg",
                    "is_active": false
                })
                .expect(201, done) 
        })
        it("should return 400 upon failed data-validation", (done) => {
            request(app)
                .post('/sar/accounts/')
                .send({
                    "first_name": "John",
                    "phone": "312-456-7890",
                    "picture": "http://example.com/images/john-smith.jpeg",
                    "is_active": false
                })
                .expect(400, done) 
        })
    })
    describe('PUT /aid', ()=>{
        it("should return 204 on success", (done) => {
            request(app)
                .put('/sar/accounts/0')
                .send({
                    "first_name": "John",
                    "last_name": "Doe",
                    "phone": "312-456-7890",
                    "picture": "http://example.com/images/john-smith.jpeg",
                    "is_active": false
                })
                .expect(204)
                .end((err, res)=>{
                    done()
                })
        })
        it("should return 400 upon failed data-validation", (done) => {
            request(app)
                .put('/sar/accounts/0')
                .send({
                    "first_name": "John",
                    "picture": "http://example.com/images/john-smith.jpeg",
                    "is_active": false
                })
                .expect(400, done)
        })
    })
    describe('PUT /aid/status', ()=>{
        it("should return 204 on success", (done) => {
            request(app)
                .put('/sar/accounts/0/status')
                .send({
                    "first_name": "John",
                    "last_name": "Doe",
                    "phone": "312-456-7890",
                    "picture": "http://example.com/images/john-smith.jpeg",
                    "is_active": true
                })
                .expect(204, done)
        })
        it("should return 400 on data-validation error", (done) => {
            request(app)
                .put('/sar/accounts/0/status')
                .send({
                    "first_name": "John",
                    "last_name": "Doe",
                    "phone": "312-456-7890",
                    "picture": "http://example.com/images/john-smith.jpeg",
                    "is_active": false
                })
                .expect(400, done) 
        })
    })
    describe('POST /aid/ratings', ()=>{
        var account = getAccountInstance()
        var ride = getRideInstance()

        it("should return 204", (done) => {
            var join_request = getJoinRequestInstance()

            accountManager.add(account)
            rideManager.add(ride)

            join_request.setRid(ride.rid)
            join_request.setAid(account.aid)

            joinRequestManager.add(join_request)

            request(app)
                .post('/sar/accounts/0/ratings')
                .send({
                    "rid": ride.rid,
                    "sent_by_id": account.aid,
                    "rating": 5,
                    "comment": "ride was great."
                })
                .expect('Location', /.*/)
                .expect(201, done) 
        })
        it("should return 400 upon failed data-validation", (done) => {
            request(app)
                .post('/sar/accounts/0/ratings')
                .send({
                    "rid": ride.rid,
                    "sent_by_id": account.aid,
                    "comment": "ride was great."
                })
                .expect(400, done)
        })
    })
    describe('GET /aid/driver', ()=>{
        it("should return 200", (done) => {
            request(app)
                .get('/sar/accounts/0/driver')
                .expect(200, done) 
        })
    })
    describe('GET /aid/rider', ()=>{
        it("should return 200", (done) => {
            request(app)
                .get('/sar/accounts/2/rider')
                .expect(200, done) 
        })
    })
})