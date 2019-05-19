const fs = require('fs');
const moment = require('moment');
const helper = require('./helper.js');

let delAppt = (req, res) => {
    res.send('id: ' + req.params.id);
};

let addAppt = (req, res) => {
    let carNum = helper.getAvail(req.body.date, req.body.time);

    if (carNum) {
        let appt = {
            client: req.body.client,
            date: req.body.date,
            time: req.body.time,
            log: [
                {
                    status: 'request',
                    pickup: req.body.pickup,
                    dropoff: req.body.dropoff,
                    datetime: moment().format('YYYY-MM-DD:hh:mm')
                }
            ],
            status: 'scheduled'
        };
        let apptId = helper.addAppt(carNum, appt);

        if (apptId) {
            res.send({ message: 'appointment added', apptId: apptId });
        } else {
            res.send({ message: 'internal error - unable to add appointment' });
        }
    } else {
        res.send({ message: 'no car available for ' + req.body.date + ' ' + req.body.time });
    }
};

module.exports = {
    delAppt: delAppt,
    addAppt: addAppt
};
