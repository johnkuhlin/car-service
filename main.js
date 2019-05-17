const express = require('express');
const app = express();
let ds = require('./datastore.js');


// delete appointments by id
app.get('/delete/:id', ds.delAppt);

// create new appointments
// app.post('/delete/:id', ds.deleteSchedule);

// update the status of an existing appointment
// retrieve a specific appointment from the database
// retrieve all appointments that are scheduled between a date range and sorted by price.

let newAppt = () => {
    let random = Math.random() * 20000;
    setTimeout(() => {
        ds.addAppt(random);
        console.log('adding new appointment');
        newAppt();
    }, random)
};

newAppt();

app.listen(8080, () => {
    console.log(`Server listening on port 8080 ...`);
});;
