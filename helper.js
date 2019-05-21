const _ = require('lodash');
const fs = require('fs');
const moment = require('moment');

const dsDir = './datastore';

const delay = 2000;
const maxCar = 3;
const randApptMax = 5;
let randApptCount = 0;

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

let updAppt = (appt) => {
    let parts = appt.id.split('_');
    let carDS = dsDir + '/car_' + parts[2];

    // check if datastore exists
    if (!fs.existsSync(carDS)) {
        appt.error = 'unable to find car ' + parts[2];
        return false;
    }
    let raw = fs.readFileSync(carDS);
    let sched = JSON.parse(raw);
    let found = _.find(sched.appts, { date: parts[0], time: parts[1] });
    // check if date + time exists
    if (!found) {
        appt.error = 'unable to find appointment ' + appt.id;
        return false;
    }
    if (!found.scheduled) {
        appt.error = 'appointment ' + appt.id + ' not scheduled';
        return false;
    }
    if (found.completed) {
        appt.error = 'appointment already completed';
        return false;
    }
    let log = {
        action: appt.action,
        datetime: moment().format('YYYY-MM-DD:hh:mm')
    }
    if (appt.action === 'completed') {
        found.completed = true;
    } else {
        if (appt.price) {
            found.price = appt.price;
        }
        _.forEach(['client', 'dropoff', 'pickup'], (field) => {
            if (appt[field]) {
                log[field] = appt[field];
            }
        });
    }
    found.logs.push(log);
    appt.error = _write(carDS, sched);
    if (appt.error) {
        return false;
    }
    return true;
};

let delAppt = (appt) => {
    let parts = appt.id.split('_');
    let carDS = dsDir + '/car_' + parts[2];

    // check if datastore exists
    if (!fs.existsSync(carDS)) {
        appt.error = 'unable to find car ' + part[2];
        return false;
    }
    let raw = fs.readFileSync(carDS);
    let sched = JSON.parse(raw);
    let found = _.find(sched.appts, { date: parts[0], time: parts[1] });
    // check if date + time exists
    if (!found) {
        appt.error = 'unable to find appointment ' + appt.id;
        return false;
    }
    // check if data + time exists
    if (!found.scheduled) {
        appt.error = 'appointment ' + appt.id + ' not scheduled';
        return false;
    }
    // check if already completed
    if (found.completed) {
        appt.error = 'appointment already completed';
        return false;
    }
    let log = {
        action: appt.action,
        datetime: moment().format('YYYY-MM-DD:hh:mm')
    }
    found.logs.push(log);
    found.scheduled = false;
    appt.error = _write(carDS, sched);
    if (appt.error) {
        return false;
    }
    return true;
};

// loop thru all the car number, return first car with available date + time
let getAvail = (date, time) => {
    for (let i = 1; i < maxCar; i++) {
        let carDS = dsDir + '/car_' + i;
        let raw = fs.readFileSync(carDS);
        let sched = JSON.parse(raw);

        let found = _.find(sched.appts, { date: date, time: time });
        if (!found) {
            return i;
        }
        if (!found.scheduled) {
            return i
        }
    };
    return 0;
};

let addAppt = (appt) => {
    let carNum = getAvail(appt.date, appt.time);

    if (!carNum) {
        appt.error = 'no car available for ' + appt.date + ' ' + appt.time;
        return false;
    }
    let carDS = dsDir + '/car_' + carNum;
    let raw = fs.readFileSync(carDS);
    let sched = JSON.parse(raw);

    let found = _.find(sched.appts, { date: appt.date, time: appt.time });
    if (!found) {
        let entry = {
            date: appt.date,
            time: appt.time,
            price: appt.price,
            scheduled: false,
            logs: []
        };
        // create date + time appointment
        sched.appts.push(entry);
        // set found to created appointment
        found = _.find(sched.appts, { date: appt.date, time: appt.time });
    }
    if (!found.scheduled) {
        let log = {
            client: appt.client,
            action: appt.action,
            pickup: appt.pickup,
            dropoff: appt.dropoff,
            datetime: moment().format('YYYY-MM-DD:hh:mm')
        }
        found.logs.push(log);
        found.scheduled = true;
    }
    appt.error = _write(carDS, sched);
    if (appt.error) {
        return false;
    }
    appt.id = appt.date + '_' + appt.time + '_' + carNum;
    return true;
};

let getAppt = (query) => {
    let parts = query.id.split('_');
    let carDS = dsDir + '/car_' + parts[2];

    // check if datastore exists
    if (!fs.existsSync(carDS)) {
        query.error = 'unable to find car ' + parts[2];
        return;
    }
    let raw = fs.readFileSync(carDS);
    let sched = JSON.parse(raw);
    let found = _.find(sched.appts, { date: parts[0], time: parts[1] });
    // check if date + time exists
    if (!found || (!query.full && !found.scheduled)) {
        query.error = 'unable to find appointment ' + query.id;
        return;
    }
    query.appt = found;
    return;
};

let getAppts = (query) => {
    query.appts = [];
    for (let i = 1; i < maxCar; i++) {
        let carDS = dsDir + '/car_' + i;
        let raw = fs.readFileSync(carDS);
        let sched = JSON.parse(raw);
        _.forEach(sched.appts, (appt) => {
            if (appt.date >= query.from && appt.date <= query.to) {
                if (query.full || (!query.full && appt.scheduled)) {
                    appt.carNum = i;
                    query.appts.push(appt);
                }
            }
        });
    }
    if (!query.appts.length) {
        query.error = 'unable to find appointment';
        return;
    }
    // sorty by price desc
    query.appts = _.orderBy(query.appts, ['price'], 'desc');
    return;
};

let randAppt = () => {
    let rand = Math.floor(Math.random() * 10);
    return {
        date: moment().add(rand, 'days').format('YYYY-MM-DD'),
        time: (10 + rand).toString() + ':00',
        client: 'John Lin',
        action: 'add',
        pickup: '888 fake street',
        dropoff: '999 real avenue',
        price: 100 + (10 * rand)
    };
};

let randAddAppt = () => {
    let random = Math.random() * delay;
    setTimeout(() => {
        addAppt(randAppt());
        randApptCount++;
        console.log('adding new appointment');
        if (randApptCount < randApptMax) {
            randAddAppt();
        }
    }, random)
};

module.exports = {
    initDS: initDS,
    randAddAppt: randAddAppt,
    addAppt: addAppt,
    delAppt: delAppt,
    updAppt: updAppt,
    getAppt: getAppt,
    getAppts: getAppts
};
