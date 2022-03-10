'use strict'

const express = require('express');
const app = express();

// Petition Debugger
const morgan = require('morgan');

// Middlewares
app.use(morgan('dev'));

// Testing endpoint
app.get('/', function (req, res) {
    res.status(200).send("I'm working correctly :)");
});

// TODO: The port must be in a config file
app.listen(8080, () => {
   console.log('Listening on port 8080');
});
