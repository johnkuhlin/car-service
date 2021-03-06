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
        dropoff: req.body.dropoff,
        price: req.body.price
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
    if (!req.body.date || !req.body.time || !req.body.client || !req.body.price) {
        res.send({ message: 'add appointment must have date, time, client and price' });
        return;
    }
    let appt = {
        date: req.body.date,
        time: req.body.time,
        client: req.body.client,
        action: 'add',
        pickup: req.body.pickup,
        dropoff: req.body.dropoff,
        price: req.body.price
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

let getAppt = (req, res) => {
    let query = {
        id: req.params.id
    };
    helper.getAppt(query)
    res.send(query);
};

let getApptFull = (req, res) => {
    let query = {
        id: req.params.id,
        full: true
    };
    helper.getAppt(query)
    res.send(query);
};

let getAppts = (req, res) => {
    let query = {
        from: req.params.from,
        to: req.params.to
    };
    helper.getAppts(query)
    res.send(query);
};

let getApptsFull = (req, res) => {
    let query = {
        from: req.params.from,
        to: req.params.to,
        full: true
    };
    helper.getAppts(query)
    res.send(query);
};


module.exports = {
    delAppt: delAppt,
    addAppt: addAppt,
    updAppt: updAppt,
    getAppt: getAppt,
    getApptFull: getApptFull,
    getAppts: getAppts,
    getApptsFull: getApptsFull
};
