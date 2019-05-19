const fs = require('fs');
const moment = require('moment');
const helper = require('./helper.js');

const dsDir = './datastore';

// create available schedule for each car
let init = (maxCar) => {
    if (!fs.existsSync(dsDir)) {
        try {
            fs.mkdirSync(dsDir);
        } catch (e) {
            console.log('unable to create directory ', dsdir);
            process.exit(1);
        }
    }
    for (let i = 1; i < maxCar; i++) {
        let carSched = dsDir + '/car_' + i;
        let sched = {
            carNum: i,
            appts: []
        };

        if (!fs.existsSync(carSched)) {
            fs.writeFileSync(carSched, JSON.stringify(sched, null, 4));
        }
    }
};

let delAppt = (req, res) => {
    res.send('id: ' + req.params.id);
};

let addAppt = (req, res) => {
    let carNum = helper.getAvail(req.body.date, req.body.time);

    if (carNum) {
        if (helper.addAppt()) {

        } else {
            internal error
        }
          res.send(JSON.stringify(appt, null, 4))
    } else {
        res.send({ status: 400, message: 'no car available for ' + req.body.date + ' ' + req.body.time });
    }
};

module.exports = {
    init: init,
    delAppt: delAppt,
    addAppt: addAppt
};
