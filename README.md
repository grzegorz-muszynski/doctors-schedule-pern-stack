## Doctor's schedule with PERN stack
Continuation of my Doctor's Schedule project. Main difference is completely different front-end part basing on React.js instead of vanilla JavaScript. Thinking about Heroku, PostgreSQL replaced SQLite. The application will be constantly enriched with new features.
### Running app locally
1. If you want to run an app locally, crucial things are having PostgreSQL managing tool and creating an .env file in the root directory where you should provide proper data like below, replacing triple x:
```
PG_USER = xxx
PG_PASSWORD = xxx
PG_HOST = xxx
PG_PORT = xxx
PG_DATABASE = xxx
```
2. In two front-end files, client\src\components\Table.js and client\src\components\CellsCreator.js, assign the API_ENDPOINTs like below:
```
const API_ENDPOINT = "http://127.0.0.1:4002/";
```
When it's done, type in a terminal (in the root directory) ```node app.js``` running a backend part. Then, in a second terminal (launched in the client folder) type ```npm start``` and wait until the program will open page in your browser.
