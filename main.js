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
// retrieve all appointments that are scheduled between a date range and sorted by price.


let newAppt = () => {
    let random = Math.random() * 20000;
    setTimeout(() => {
//        ds.addAppt(random);
        console.log('adding new appointment');
        newAppt();
    }, random)
};

helper.initDS();
newAppt();



app.listen(8080, () => {
    console.log(`Server listening on port 8080 ...`);
});;
