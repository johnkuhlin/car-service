# car-service
<br />
<br />
<br />
# add appointent<br />
curl -H "Content-Type: application/json" -X POST -d '{"client": "John Doe", "date": "2019-05-20", "time": "13:00", "pickup": "111 fake street", "dropoff": "222 real avenue"}' http://localhost:8080/addAppt
<br />
<br />
# delete appointent<br />
curl -H "Content-Type: application/json" -X POST -d '{"id": "2019-05-20_13:00_2"}' http://localhost:8080/delAppt
