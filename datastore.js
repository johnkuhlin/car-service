const fs = require('fs');

const helper = require('./helper.js');

let updAppt = (req, res) => {
    // check required input
    if (!req.body.id) {
        res.send({ message: 'update appointment must have id' });
        return;
    }
    let appt = {
        id: req.body.id,
        client: req.body.client,
        action: req.body.action,
        pickup: req.body.pickup,
        dropoff: req.body.dropoff
    };
    if (req.body.action !== 'completed') {
        appt.action = 'update';
    }
    if (helper.updAppt(appt)) {
        res.send({ message: 'appointment ' + appt.id + ' updated' });
        return;
    }
    res.send({ message: appt.error });
    return;
};

let delAppt = (req, res) => {
    // check required input
    if (!req.body.id) {
        res.send({ message: 'delete appointment must have id' });
        return;
    }
    let appt = {
        id: req.body.id,
        action: 'delete'
    }
    if (helper.delAppt(appt)) {
        res.send({ message: 'appointment ' + appt.id + ' deleted' });
        return;
    }
    res.send({ message: appt.error });
    return;
};

let addAppt = (req, res) => {
    // check required input
    if (!req.body.date || !req.body.time || !req.body.client) {
        res.send({ message: 'add appointment must have date, time and client' });
        return;
    }
    let appt = {
        date: req.body.date,
        time: req.body.time,
        client: req.body.client,
        action: 'add',
        pickup: req.body.pickup,
        dropoff: req.body.dropoff
    };
    if (helper.addAppt(appt)) {
        res.send({ message: 'appointment added', id: appt.id });
        return;
    }
    if (appt.error) {
        res.send({ message: appt.error });
        return;
    }
    res.send({ message: 'internal error - unable to add appointment' });
    return;
};

module.exports = {
    delAppt: delAppt,
    addAppt: addAppt,
    updAppt: updAppt
};
