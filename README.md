# Gate_IN_System

# Description

### Project origin
Gate_IN_System is a full-stack project which i performed as one of the task given by my industrial supervisor at my Industrial Practical Training serving time at Amatics Technologies Company ltd.

### What it can do
Gate_IN_System is a huge project consisting of Three different system users which are company gate-worker, department-workers and company manager who is the system administrator.

The Company gate-worker performs the following activities.

1. Registering of company visiting guests in a given day.
2. Giving the visited guests his/her visited department direction information as the system provides after guests registration.
3. Approve departure's time of the company visited guests when passing out of the gate.

The Company department-workers performs the following

1. Login to the system and view the visited guests which have not yet departure from the company with respect of his/her working department.
2. Approve the visited guests if is Attended or Not attended.

The Company manager(system-administrator) performs the following.

1. Login to the system and view all registered guests visited at all company departments in a given day.
2. Registering new department workers.
3. Activate and deactivate employees accounts.
4. Updating and Deleting an employee account.


### Technology used
In this project for frontend part i used React.JS and Chakra-UI for styling rendered react components at the browser. I used React.js because it has enable a developer to embedd
html elements inside a javascript file(JSX), So this has made me to save time when developing this system. Also React.JS contains Virtual DOM this helps in rendering components easily 
even when there are changes that have occured within the DOM tree.

In this project for backend part i used Node.JS with Express.js. Also i used prisma ORM for performing Creation, Reading, Updation and Deletion of Workers data in Workers table from database.

### Challenges and future adding features
One of the challenges faced in this project is implementation of React.JS CSS library called Chakra.UI in frontend part as i was new to it and this it was my first project using Chakra.UI in React.JS files.

One of the features that i will add at this project in the feature is Google authenitication.

# Installation guide
1. Install Node.js v16.14.2 in your local computer [Node Js](https://nodejs.org/en/).
2. Install Git as a version controller.
3. Copy the project repository directory URL from here.
4. Go to the directory in your computer where you want the cloned project to be placed.
5. Open the command line and run git clone [paste the URL] then run.
6. The project folders named frontend and backend are ready set in your local computer at that specific directory.

### Backend setup
7. Open the Command Line Interface(CLI) in your present directory then run the command cd backend. This will direct you to the backend folder.
8. Inside the backend folder rename example.env file to be .env.
9. After that open the terminal and run the command npm install. This will install all the dependencies present in package.json file into your backend folder.

### Frontend setup
10. Back to your root directory where you can access both frontend and backend cloned folders.
11. Open the Command Line Interface(CLI) in your present directory then run the command cd frontend. This will direct you to the frontend folder.
12. Inside the frontend folder open the terminal and run command npm install. This will install all the dependencies present in package.json file into your frontend folder.

# How to use the project

### Backend use
1. Create a database within your Database Management System either MYSQL, POSTGRESQL or any other relational DBMS.
2. Back to your root directory where you can access both frontend and backend cloned folders.
3. Open the Command Line Interface(CLI) in your present directory then run the command cd backend. This will direct you to the backend folder.
4. Inside the backend folder edit the credentials inside the .env file as instructed inside it. 
5. Within the schema.prisma file is where you I placed my models(database table) named Floor, Room, Department, Workers and Guests with relationships between them, for more understanding visit [prisma docs](https://www.prisma.io/).
6. Open the terminal and run npx prisma migrate --dev. This will create migration file.
7. Visit your created database you will see a 5 tables have been created with different columns
8. For further database books model updates within schema.prisma file run first npx prisma db pull then after updating the models run npx prisma db push within the CLI.
9. After all this setups run npm start to your terminal to initiate the express server.

### Frontend use
1. Back to your root directory where you can access both frontend and backend cloned folders.
2. Open the Command Line Interface(CLI) in your present directory then run the command cd frontend. This will direct you to the frontend folder.
3. Inside the frontend folder open the terminal and run command npm start inorder to initiate React.JS server.
4. Wait for a moment then you will observe the main route opens at localhost:3000 in your browser.
5. If it hasnot opened at the browser but the server is already initiated then open the browser and write localhost:3000 in the search engine and run.
6. Now both servers frontend and backend are running your are ready to test the functionalities well.

# Project End-points

### Backend
Workers Routes

| HTTP Method  | URL |Functionality|
| ------------- | ------------- |-------|
| POST  | /addWorkers  |adding Workers in database|
| POST  | /login   |for workers login |
| POST  | /deptWorkers  |for fetching workers present in a give department name|
| POST  | /resetPassword  |for checking valid worker's email for password reset|
| POST  | /sendEmail | for sending email to a worker for password reset|
| GET  | /allWorkers  |for fetching all workers |
| GET  | /idWorkers/:id  |for fetching workers by their id|
| PUT  | /idWorkers/:id |for updating workers by their id|
| DELETE  | /idWorkers/:id | for deleting workers from id parameter|


Guests Routes

| HTTP Method  | URL |Functionality|
| ------------- | ------------- |-------|
| POST  | /addGuests  |adding Guests in database|
| POST  | /idGuests  |for fetching guests by there idNumbers |
| POST  | /getDeptGuests  |for fetching all guests by there department visited and date|
| POST  | /deptGuests  |for fetching all guests by their department visited but not attended|
| GET  | /allGuests  |for fetching all Guests |
| GET  | /deptNames  |for getting all data from Department table;|
| PUT  | /attendGuest/:id|for updating guest if isAttended|
| PUT  | /notAttendGuest/:id |for updating guest if isNotAttended|
| PUT  | //idGuests/:id |for updating guest departure time|


### Frontend
| URL |Functionality|
| ------------- |-------|
| /  |Displays a system login page |
| /guestsForm   |Displays an Guests registration Form|
| /approveGuests  |Displays approveGuests Clock-OUt form|
| /admin |Displays admin page after he/she has logged in|
| /workers  |Displays workers page after they have logged in|
| /allWorkers  |Displays a form where admin can view all workers within their respective departments|
| /WorkersForm |Displays workers registration form|
| /editWorkers/:id  |Displays a form for editing and updating workers credentials|
| /emailConfig |Displays a form where a workers fill his/her email inorder to get reset password link|
| /resetPassword |Displays a form where a worker fill his new password credentials for password reset|
| /404 |Displays 404 Not Found message when a system user visit unknown endpoint|


# Acknowlegements
I obtained Node.Js knowldege and Express.js from treehouse tutorials [teamtreehouse](https://teamtreehouse.com/) and React.Js knowledge from [React.Js](https://reactjs.org/).

Also i used [stackoverflow](https://stackoverflow.com/) and [w3schools](https://www.w3schools.com/) to solve many of challenges i faced when performing this project.

Also i obtained prisma ORM knowledge from [prisma docs](https://www.prisma.io/).

Also Chackra.UI knowledge i learned from [Chackra.UI](https://chakra-ui.com/) documentation and taught on how to implement chakra.UI in styling react components by my programming mentor [Cosmas Billa](https://github.com/lodricklawrence/cosmas28)

