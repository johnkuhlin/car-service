# car-service
<br />
## INSTALL<br />
- npm install<br />
<br />
<br />
<br />
## POST<br />
### add appointment<br />
curl -H "Content-Type: application/json" -X POST -d '{"client": "John Doe", "date": "2019-05-20", "time": "13:00", "pickup": "111 fake street", "dropoff": "222 real avenue"}' http://localhost:8080/addAppt
<br />
<br />
### delete appointment<br />
curl -H "Content-Type: application/json" -X POST -d '{"id": "2019-05-20_13:00_2"}' http://localhost:8080/delAppt
<br />
<br />
### update appointment<br />
curl -H "Content-Type: application/json" -X POST -d '{"id": "2019-05-20_13:00_2", "client": "Jane Smith", "pickup": "333 fake street", "dropoff": "444 real avenue"}' http://localhost:8080/updAppt
<br />
<br />
### complete appointment<br />
curl -H "Content-Type: application/json" -X POST -d '{"id": "2019-05-20_13:00_2", "actopm": "completed"}' http://localhost:8080/updAppt
<br />
<br />
<br />
## GET<br />
### query by appointment id
http://localhost:8080/appt/{id}<br />
- example http://localhost:8080/appt/2019-05-20_13:00_2<br />
- including deleted http://localhost:8080/appt/2019-05-20_13:00_2/full<br />
<br />
<br />
### query by date range
http://localhost:8080/appts/{from}/{to}<br />
- example http://localhost:8080/appts/2019-05-20/2019-05-21<br />
- including deleted http://localhost:8080/appts/2019-05-20/2019-05-21/full<br />
