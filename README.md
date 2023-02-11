## Doctor's schedule with PERN stack
Continuation of my Doctor's Schedule project. Main difference is completely different front-end part basing on React.js instead of vanilla JavaScript. Thinking about Heroku, PostgreSQL replaced SQLite. The application will be constantly enriched with new features.
### Running app
If you want to run an app locally, crucial things are having PostgreSQL managing tool and replacing a part of code in app.js:
```
  const db = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
       rejectUnauthorized: false
      }
  });
```
Instead of the code above, there should be code below, filled with proper data:
```
  const db = new Client({
      host: "localhost",
      user: "xxx",
      port: "xxx",
      database: "xxx",
      password: "xxx"
  });
```
In the front-end part, src/components/Table.js, assign the API_ENDPOINT like below:
```
const API_ENDPOINT = "http://127.0.0.1:4002/";
```
When it's done, type in a terminal ```node app.js``` running a backend part. Then, in a second terminal type ```npm start``` and wait until the program will open page in your browser.