# car-service

## INSTALL
- npm install
- node main.js

## POST
### add appointment
curl -H "Content-Type: application/json" -X POST -d '{"client": "John Doe", "date": "2019-05-20", "time": "13:00", "pickup": "111 fake street", "dropoff": "222 real avenue", "price": 110}' http://localhost:8080/addAppt

### delete appointment
curl -H "Content-Type: application/json" -X POST -d '{"id": "2019-05-20_13:00_2"}' http://localhost:8080/delAppt

### update appointment
curl -H "Content-Type: application/json" -X POST -d '{"id": "2019-05-20_13:00_2", "client": "Jane Smith", "pickup": "333 fake street", "dropoff": "444 real avenue", "price": 180}' http://localhost:8080/updAppt

### complete appointment
curl -H "Content-Type: application/json" -X POST -d '{"id": "2019-05-20_13:00_2", "actopm": "completed"}' http://localhost:8080/updAppt


## GET
### query by appointment id
http://localhost:8080/appt/{id}
- example http://localhost:8080/appt/2019-05-20_13:00_2
- including deleted http://localhost:8080/appt/2019-05-20_13:00_2/full

### query by date range
http://localhost:8080/appts/{from}/{to}
- example http://localhost:8080/appts/2019-05-20/2019-05-21
- including deleted http://localhost:8080/appts/2019-05-20/2019-05-21/full
