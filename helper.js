const _ = require('lodash');
const fs = require('fs');

const dsDir = './datastore';

const maxCar = 3;

// create available schedule for each car
let initDS = () => {
    if (!fs.existsSync(dsDir)) {
        try {
            fs.mkdirSync(dsDir);
        } catch (e) {
            console.log('unable to create directory ', dsdir);
            process.exit(1);
        }
    }
    for (let i = 1; i < maxCar; i++) {
        let carDS = dsDir + '/car_' + i;
        let sched = {
            appts: {}
        };

        if (!fs.existsSync(carDS)) {
            try {
                fs.writeFileSync(carDS, JSON.stringify(sched, null, 4));
            } catch (e) {
                console.log('unable to create file ', carDS);
                process.exit(1);
            }
        }
    }
};

let getAvail = (date, time) => {
    for (let i = 1; i < maxCar; i++) {
        let carDS = dsDir + '/car_' + i;
        let raw = fs.readFileSync(carDS);
        let sched = JSON.parse(raw);
        let id = date + '_' + time;

        if (sched.appts[id]) {
            if (sched.appts[id].status === 'available') {
                return i;
            }
        } else {
            return i;
        }
    };
    return 0;
};

let addAppt = (carNum, appt) => {
    let carDS = dsDir + '/car_' + carNum;
    let raw = fs.readFileSync(carDS);
    let sched = JSON.parse(raw);
    let id = appt.date + '_' + appt.time;

    if (!sched.appts[id]) {
        sched.appts[id] = appt;
    }
    try {
        fs.writeFileSync(carDS, JSON.stringify(sched, null, 4));
        return id + '_' + carNum;
    } catch (e) {
        return 0;
    }
};

module.exports = {
    initDS: initDS,
    getAvail: getAvail,
    addAppt: addAppt,
};
