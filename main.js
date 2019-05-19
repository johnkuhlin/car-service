const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ds = require('./datastore.js');
const maxCar = 3;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// delete appointments by id
app.get('/delAppt/:id', ds.delAppt);

// create new appointments
app.post('/addAppt', ds.addAppt);

// update the status of an existing appointment
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

ds.init(maxCar);
newAppt();



app.listen(8080, () => {
    console.log(`Server listening on port 8080 ...`);
});;
