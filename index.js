const express = require('express'),
    app = express(),
    parser = require('body-parser'),
    router = require('./controllers/route-index'),
    authorization = require('./middlewares/authorization');

// Parsing request/response data
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// Application-level middleware
app.use(authorization);

// Route Initialization
app.use(router);

// Specifies which port to run the server on.
app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});