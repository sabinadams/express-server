const express = require('express')
const app = express()
const parser = require('body-parser');
const router = require('./controllers/route-index');
const authorization = require('./middlewares/authorization');

// Parsing request/response data
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// Application-level middleware
app.use(authorization);

// Route Initialization
app.use(router);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});