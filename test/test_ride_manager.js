const assert = require('assert');
const { RideManager } = require('../managers/ride_manager')
const { Ride } = require('../models/ride')
const { getRideInstance } = require('./test_ride')

describe('RideManager', () => {
  describe('#constructor()', function() {
    it('should be an empty array of rides', (done) => {
        var ride_manager = instance()
        assert.equal(ride_manager.rides.length, 0)
        done()
    });
  });
  describe('#add()', () => {
    it('should contain new ride after adding', (done) => {
        var ride_manager = instance()
        var ride = getRideInstance()

        assert.equal(ride_manager.rides.length, 0)
        ride_manager.add(ride)
        assert.equal(ride_manager.rides.length, 1)
        assert.equal(ride_manager.rides[0], ride)
        done()
    });
  });
  describe('#get()', () => {
    it('should get new ride by rid after adding', (done) => {
        var ride_manager = instance()
        var ride = getRideInstance()

        ride_manager.add(ride)
        assert.equal(ride_manager.get(ride.rid), ride)
        done()
    })
    it('should throw an error after get()ing wrong rid', (done) => {
        var ride_manager = instance()
        var ride = getRideInstance()

        ride_manager.add(ride)

        assert.throws(()=>{
            ride_manager.get(11)
        }, undefined, 'rid doesnt exist')
        done()
    })
  })
  describe('#getByAid', () =>{
    it('should get an array of rides created by the same aid', (done)=>{
        var ride_manager = instance()
        var ride = getRideInstance()
        const AID = 0
        ride.setAid(AID)
        var ride2 = getRideInstance()
        ride2.setAid(AID)

        assert.equal(ride_manager.getByAid(AID).length, 0)

        ride_manager.add(ride)

        assert.equal(ride_manager.getByAid(AID).length, 1)

        ride_manager.add(ride2)

        assert.equal(ride_manager.getByAid(AID).length, 2)
        done()
    })
  })
  describe('#getAll', () =>{
    it('should get all rides when no params passed', (done)=>{
        var ride_manager = instance()
        var ride = getRideInstance()

        assert.equal(ride_manager.getAll().length, 0)

        ride_manager.add(ride)

        assert.equal(ride_manager.getAll().length, 1)

        done()
    })
    it('should get all rides to/from a city', (done)=>{
        var ride_manager = instance()

        var ride = getRideInstance()
        ride.location_info.from_city = 'Chicago'
        ride.location_info.to_city = 'Miami'

        ride_manager.add(ride)

        assert.equal(ride_manager.getAll('Chicago').length, 1)

        var ride2 = getRideInstance()
        ride2.location_info.from_city = 'Not Chicago'
        ride2.location_info.to_city = 'Miami'
        
        ride_manager.add(ride2)

        assert.equal(ride_manager.getAll('', 'Miami').length, 2)
        assert.equal(ride_manager.getAll('Chicago', 'Miami').length, 1)

        done()
    })
    it('should get all rides on a specific date', (done)=>{
        var ride_manager = instance()
        var ride = getRideInstance()
        ride.date_time.date = '14-Apr-2020'

        ride_manager.add(ride)

        assert.equal(ride_manager.getAll('','','15-Apr-2020').length, 0)
        assert.equal(ride_manager.getAll('','','14-Apr-2020').length, 1)

        var ride2 = getRideInstance()
        ride2.date_time.date = '14-Apr-2020'
        ride_manager.add(ride2)

        assert.equal(ride_manager.getAll('','','14-Apr-2020').length, 2)

        done()
    })
  })
  describe('#delete()', ()=>{
    it('should delete a ride given its rid', (done)=>{
        var ride_manager = instance()
        var ride = getRideInstance()

        ride_manager.add(ride)

        assert.equal(ride_manager.getAll().length, 1)
        
        ride_manager.delete(ride.rid)

        assert.equal(ride_manager.getAll().length, 0)
        done()
    })
  })
});

function instance() {
    return new RideManager()
}

module.exports.getRideManagerInstance = instance