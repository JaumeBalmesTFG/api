'use strict'

const express = require('express');
const app = express();

// Petition Debugger
const morgan = require('morgan');

// Config
const {HttpStatusCode, HttpStatusMessage} = require('./config/status-codes');

// Middlewares
app.use(morgan('dev'));

// Testing endpoint
app.get('/', function (req, res) {
    res.status(HttpStatusCode.OK).send(HttpStatusMessage.OK);
});

// TODO: The port must be in a config file
app.listen(8080, () => {
   console.log('Listening on port 8080');
});
