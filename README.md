## Doctor's schedule with PERN stack
Continuation of my Doctor's Schedule project. Main difference is completely different front-end part basing on React.js instead of vanilla JavaScript. Thinking about Heroku, PostgreSQL replaced SQLite. The application will be constantly enriched with new features.
### Heroku
I recommend to open the application using Chrome or Opera browsers.
Link: https://doctors-schedule-pern-stack.herokuapp.com/
### Running app locally
1. If you want to run an app locally, crucial things are having PostgreSQL managing tool and changing code in app.js file like below:
```
const db = new Client({
    connectionString: process.env.DATABASE_URL, // Heroku addons
    ssl: {
        rejectUnauthorized: false
    }
});
```
Replace the part of code above with the code below putting proper data instead of triple x.
```
const db = new Client({
    host: xxx,
    user: xxx,
    port: xxx,
    database: xxx,
    password: xxx
});
```
2. In three files Table.js, CellsCreator.js and Visits.js, in the directory "client\src\components\", assign the API_ENDPOINTs like below:
```
const API_ENDPOINT = "http://127.0.0.1:4002/";
```
When it's done, type in a terminal (in the root directory) ```node app.js``` running a backend part. Then, in a second terminal (launched in the client folder) type ```npm start``` and wait until the program will open page in your browser.
