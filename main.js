const express = require('express');
const bodyParser = require('body-parser');

const ds = require('./datastore.js');
const helper = require('./helper');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// delete appointments by id
app.post('/delAppt', ds.delAppt);

// create new appointments
app.post('/addAppt', ds.addAppt);

// update the status of an existing appointment
app.post('/updAppt', ds.updAppt);

// retrieve a specific appointment from the database
app.get('/appt/:id', ds.getAppt)
// retrieve a specific appointment from the database including full log
app.get('/appt/:id/full', ds.getApptFull)

// retrieve all appointments that are scheduled between a date range and sorted by price.
app.get('/appts/:from/:to', ds.getAppts)
// retrieve all appointments that are scheduled between a date range and sorted by price including full log
app.get('/appts/:from/:to/full', ds.getApptsFull)

helper.initDS();
helper.randAddAppt();

app.listen(8080, () => {
    console.log(`Server listening on port 8080 ...`);
});;
