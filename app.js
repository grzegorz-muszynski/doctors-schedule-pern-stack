const express = require('express');
const app = express(); // importing the CORS library to allow Cross-origin resource sharing
const cors = require('cors');
const path = require("path"); // Crucial for app.use
const bodyParser = require('body-parser');
const {Client} = require('pg'); // PostgreSQL

const PORT = process.env.PORT || 4002;

// Middleware
app.use(cors()); // Enable CORS 
app.use(express.json()); // Recognize Request Objects as JSON objects
// app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, "client/build")));
// app.use(express.static(path.join(__dirname, "client/build"))); // Was before 6:24 10/02/2023
// app.use(express.static('public'));
// app.use(express.static(path.join("client/build")));
//app.use(express.static("client/build")); // The crucial line for connecting front-end part correctly
app.use(bodyParser.json());
// Allows for using information coming from forms
// app.use(express.urlencoded({ extended: true })); // My old code
app.use(bodyParser.urlencoded({ extended: true })); // From Codecademy

// Database
const db = new Client({
    connectionString: process.env.DATABASE_URL, // Heroku addons
    ssl: {
        rejectUnauthorized: false
    }
});
db.connect();


// In CLI created the table: CREATE TABLE visits (id INTEGER PRIMARY KEY, name TEXT NOT NULL, surname TEXT NOT NULL, phone_number INTEGER NOT NULL, SSN TEXT NOT NULL, day TEXT NOT NULL DEFAULT '', time TEXT NOT NULL DEFAULT '');

// Routes

// Renders the page - seems unuseful=====================================
// app.get('/', (req, res) => {
    // When it is all outcommented - table is created, app crashes after refreshing
    // When this route is empty - table is created, app crashes after refreshing
    //  res.render('schedule'); // When is only this line - table is created, app crashes after refreshing
    // res.sendStatus(201); // When is only this line - table is NOT created
// });

// The route used by CellsCreator component
// '/getting' makes the table is created. All different routes makes table doesn't render
// app.get('/getting', (req, res) => {
//     const sql2 = `SELECT * FROM visits`;
//     db.query(sql2, (err, data) => {
//         if (!err) {
//             let visitsDb = data.rows;
//             res.status(200).json(visitsDb);
//         } else {
//             console.log(err.message);
//         }
//         db.end;
//     });
// });
// Test
app.get('/getting', (req, res) => {
    res.status(200).json(54321); // Makes the app crashes immediately
});

// The routes used by Table components
app.post('/posting', (req, res, next) => {
     // Inserting into a database
     const sql = 'INSERT INTO visits (name, surname, phone_number, SSN, day, time) VALUES ($1, $2, $3, $4, $5, $6)';
    db.query(sql, [
        req.body[0],
        req.body[1],
        req.body[2],
        req.body[3],
        req.body[4],
        req.body[5]
    ], function(err) {
        if (err) {
            console.log("Error while inserting into a database: ", err);
            return res.sendStatus(500);
        } else {
            return res.sendStatus(201);
        }
    });
    // console.log('message to heroku logs====================!!!!!!!!!!!!!');
    //  res.status(200).json(33333); // the error comes from bad db implementation. When there is this action - there are no problems
});

app.put('/change', (req, res, next) => {
    // Updating a database
    const sql = 'UPDATE visits SET name = $1, surname = $2, phone_number = $3, SSN = $4 WHERE day = $5 AND time = $6';
    db.query(sql, [
        req.body[0],
        req.body[1],
        req.body[2],
        req.body[3],
        req.body[4],
        req.body[5]
    ], function(err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else {
            return res.sendStatus(201);
        }
    });
});

app.delete('/day/:day/time/:time', (req, res) => {
    // Deleting data inside of the database
    const sql = 'DELETE FROM visits WHERE day = $1 AND time = $2';
    db.query(sql, [
        req.params.day,
        req.params.time
    ], function(err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else {
            return res.sendStatus(204);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});