const express=require("express");
const app=express();
const cors = require('cors')
const bodyParser=require("body-parser");
const gateIN=require('./gateIN');
const PORT=5000;

app.use(bodyParser.json());
app.use(cors());

// express listen PORT
app.listen(PORT,()=>{
    console.log("server is listening on port "+PORT);
  });

// WORKERS ROUTES

// POST REQUESTS
// post request for adding Workers in database
app.post('/addWorkers',gateIN.addWorkers);

// post request for workers login  
app.post('/login',gateIN.login);

// post request for fetching workers present in a give department name
app.post('/deptWorkers',gateIN.getWorkersByDepartment);

// post request for sending email to a worker for password reset
app.post('/sendEmail',gateIN.sendEmail);

// post request for sending email to a worker for password reset
app.post('/resetPassword',gateIN.resetPassword);


// GET REQUESTS
// get request for fetching all workers
app.get('/allWorkers',gateIN.getAllWorkers);

// get request for fetching workers by their id
app.get('/idWorkers/:id',gateIN.getWorkersById);


// PUT REQUESTS

// put request for editing workers from their id
app.put('/idWorkers/:id',gateIN.editWorkers);


// DELETE REQUESTS

// delete request for deleting workers from id parameter
app.delete('/idWorkers/:id',gateIN.deleteWorkers);



// GUESTS ROUTES


// POST REQUESTS

// post request for adding Guests in database
app.post("/addGuests",gateIN.addGuests);

// post request for fetching guests by there idNumbers
app.post('/idGuests',gateIN.getGuestsById);

// post request for fetching all guests by there department visited and date
app.post('/getDeptGuests',gateIN.verifyToken,gateIN.getGuestsByDeptVisited_time);

// post request for fetching all guests by their department visited but not attended
app.post('/deptGuests',gateIN.verifyToken,gateIN.getNotAttendedGuests);


// GET REQUESTS

// get request for fetching all guests
app.get('/allGuests', gateIN.getAllGuests);


// PUT REQUESTS

//put request for updating guest if isAttended
app.put('/attendGuest/:id',gateIN.editAttendedGuests);

//put request for updating guest if isNotAttended
app.put('/notAttendGuest/:id',gateIN.editNotAttendedGuests);

// put request for updating guest departure time
app.put('/idGuests/:id',gateIN.editGuestsDepartureTime);

// Get request for getting all data from Department table;
app.get('/deptNames',gateIN.getDepartmentInfo);


