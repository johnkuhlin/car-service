const fs = require('fs');

const helper = require('./helper.js');

let delAppt = (req, res) => {
    let error = helper.delAppt(req.body.id);
    if (error) {
        res.send({ message: error });
    } else {
        res.send({ message: 'appointment ' + req.body.id + ' deleted' });
    }
};

let addAppt = (req, res) => {
    let appt = {
        date: req.body.date,
        time: req.body.time,
        action: 'add',
        client: req.body.client,
        pickup: req.body.pickup,
        dropoff: req.body.dropoff
    };
    let apptId = helper.addAppt(appt);

    if (apptId) {
        res.send({ message: 'appointment added', apptId: apptId });
    } else {
        if (appt.error) {
            res.send({ message: appt.error });
        } else {
            res.send({ message: 'internal error - unable to add appointment' });
        }
    }
};

module.exports = {
    delAppt: delAppt,
    addAppt: addAppt
};
