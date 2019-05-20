# car-service
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
### query by date range
