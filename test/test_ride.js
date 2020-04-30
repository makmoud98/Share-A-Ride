const assert = require('assert')
const { Ride } = require('../models/ride')

describe('Ride', ()=>{
    describe('#constructor', ()=>{
        it('should initalize values', (done)=>{
            var ride = instance()
            assert.notEqual(ride.aid, undefined)
            assert.notEqual(ride.location_info, undefined)
            assert.notEqual(ride.date_time, undefined)
            assert.notEqual(ride.car_info, undefined)
            assert.notEqual(ride.max_passengers, undefined)
            assert.notEqual(ride.amount_per_passenger, undefined)
            assert.notEqual(ride.conditions, undefined)
            done()
        })
    })

    describe('#setLocation', ()=>{
        it('should not allow missing required values', (done)=>{
            var ride = instance()
            assert.throws(()=>{
                ride.setLocation()
            }, undefined, "Invalid value for location_info")
            assert.throws(()=>{
                ride.setLocation({
                    from_city: 'Chicago'
                })
            }, undefined, "Invalid value for location_info")
            assert.throws(()=>{
                ride.setLocation({
                    to_city: 'Chicago'
                })
            }, undefined, "Invalid value for location_info")
            done()
        })
    })

    describe('#setDateTime', ()=>{
        it('should not allow missing required values', (done)=>{
            var ride = instance()
            assert.throws(()=>{
                ride.setDateTime()
            }, undefined, "Invalid value for date_time")
            assert.throws(()=>{
                ride.setDateTime({
                    date: '14-Apr-2020'
                })
            }, undefined, "Invalid value for date_time")
            assert.throws(()=>{
                ride.setDateTime({
                    time: '09:00'
                })
            }, undefined, "Invalid value for date_time")
            done()
        })
    })

    describe('#setCarInfo', ()=>{
        it('should not allow missing required values', (done)=>{
            var ride = instance()
            assert.throws(()=>{
                ride.setCarInfo()
            }, undefined, "Invalid value for car_info")
            assert.throws(()=>{
                ride.setCarInfo({
                    model: 'A4',
                    color: 'Gray',
                    plate_state: 'IL',
                    plate_serial: 'COVID19'
                })
            }, undefined, "Invalid value for car_info")
            assert.throws(()=>{
                ride.setCarInfo({
                    make: 'Audi',
                    color: 'Gray',
                    plate_state: 'IL',
                    plate_serial: 'COVID19'
                })
            }, undefined, "Invalid value for car_info")
            assert.throws(()=>{
                ride.setCarInfo({
                    make: 'Audi',
                    model: 'A4',
                    plate_state: 'IL',
                    plate_serial: 'COVID19'
                })
            }, undefined, "Invalid value for car_info")
            assert.throws(()=>{
                ride.setCarInfo({
                    make: 'Audi',
                    model: 'A4',
                    color: 'Gray',
                    plate_serial: 'COVID19'
                })
            }, undefined, "Invalid value for car_info")
            assert.throws(()=>{
                ride.setCarInfo({
                    make: 'Audi',
                    model: 'A4',
                    color: 'Gray',
                    plate_state: 'IL',
                })
            }, undefined, "Invalid value for car_info")
            done()
        })
    })
        
    describe('#setMaxPassengers', ()=>{
        it('should not allow missing required values', (done)=>{
            var ride = instance()
            assert.throws(()=>{
                ride.setMaxPassengers()
            }, undefined, "Invalid value for max_passengers")
            done()
        })
    })

    describe('#setAmountPerPassenger', ()=>{
        it('should not allow missing required values', (done)=>{
            var ride = instance()
            assert.throws(()=>{
                ride.setAmountPerPassenger()
            }, undefined, "Invalid value for amount_per_passenger")
            done()
        })
    })

    describe('#setConditions', ()=>{
        it('should not allow missing required values', (done)=>{
            var ride = instance()
            assert.throws(()=>{
                ride.setConditions()
            }, undefined, "Invalid value for conditions")
            done()
        })
    })
})


function instance() {
    return new Ride(
        0,
        {
            from_city: 'Chicago',
            to_city: 'Miami'
        },
        {
            date: '14-Apr-2020',
            time: '09:00'
        },
        {
            make: 'Audi',
            model: 'A4',
            color: 'Gray',
            plate_state: 'IL',
            plate_serial: 'COVID19'
        },
        2,
        15,
        'No more than one carry on per passenger. No pets.'
    );
}

module.exports.getRideInstance = instance