const _ = require('lodash');
const fs = require('fs');
const moment = require('moment');

const dsDir = './datastore';

const maxCar = 3;

let _mkdir = () => {
    if (!fs.existsSync(dsDir)) {
        try {
            return fs.mkdirSync(dsDir);
        } catch (e) {
            return 'unable to create directory ', dsDir;
        }
    }
};

let _write = (carDS, sched) => {
    try {
        return fs.writeFileSync(carDS, JSON.stringify(sched, null, 4));
    } catch (e) {
        return 'unable to write file ', carDS;
    }
};

// create available schedule for each car
let initDS = () => {
    let error = _mkdir();
    if (error) {
        console.log(error);
        process.exit(1);
    }
    for (let i = 1; i < maxCar; i++) {
        let carDS = dsDir + '/car_' + i;
        let sched = {
            appts: []
        };

        if (!fs.existsSync(carDS)) {
            let error = _write(carDS, sched)
            if (error) {
                console.log(error);
                process.exit(1);
            }
        }
    }
};

let delAppt = (apptId) => {
    let parts = apptId.split('_');
    let carDS = dsDir + '/car_' + parts[2];

    // return true if car number exists and date + time has status scheduled
    if (fs.existsSync(carDS)) {
        let raw = fs.readFileSync(carDS);
        let sched = JSON.parse(raw);
        let found = _.find(sched.appts, { date: parts[0], time: parts[1] });
        if (found) {
            if (found.available) {
                return 'appointment ' + apptId + ' not scheduled';
            }
            let log = {
                action: 'delete',
                datetime: moment().format('YYYY-MM-DD:hh:mm')
            }
            found.logs.push(log);
            found.available = true;
            return _write(carDS, sched);
        }
        return 'unable to find appointment ' + apptId;
    }
    return 'unable to find car ' + part[2];
};

// loop thru all the car number, return first car with available date + time
let _getAvail = (date, time) => {
    for (let i = 1; i < maxCar; i++) {
        let carDS = dsDir + '/car_' + i;
        let raw = fs.readFileSync(carDS);
        let sched = JSON.parse(raw);

        let found = _.find(sched.appts, { date: date, time: time });
        if (found) {
            if (found.available) {
                return i
            }
        } else {
            return i;
        }
    };
    return 0;
};

let addAppt = (appt) => {
    let carNum = _getAvail(appt.date, appt.time);

    if (!carNum) {
        appt.error = 'no car available for ' + appt.date + ' ' + appt.time;
        return 0;
    }
    let carDS = dsDir + '/car_' + carNum;
    let raw = fs.readFileSync(carDS);
    let sched = JSON.parse(raw);

    let found = _.find(sched.appts, { date: appt.date, time: appt.time });
    if (!found) {
        let entry = {
            date: appt.date,
            time: appt.time,
            available: true,
            logs: []
        };
        // create date + time appointment
        sched.appts.push(entry);
        // set found to created appointment
        found = _.find(sched.appts, { date: appt.date, time: appt.time });
    }
    if (found.available) {
        let log = {
            client: appt.client,
            action: appt.action,
            pickup: appt.pickup,
            dropoff: appt.dropoff,
            datetime: moment().format('YYYY-MM-DD:hh:mm')
        }
        found.logs.push(log);
        found.available = false;
    }
    appt.error = _write(carDS, sched);
    if (appt.error) {
        return 0
    }
    return appt.date + '_' + appt.time + '_' + carNum;
};

module.exports = {
    initDS: initDS,
    addAppt: addAppt,
    delAppt: delAppt
};
