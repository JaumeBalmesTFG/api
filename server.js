'use strict'

const express = require('express');
const app = express();

// Petition Debugger
const morgan = require('morgan');

// Config
const {PORT, URI} = require('./config/config');
const {HttpStatusCode, HttpStatusMessage} = require('./config/status-codes');

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Testing endpoint
app.get('/', function (req, res) {
    res.status(HttpStatusCode.OK).send(HttpStatusMessage.OK);
});

// Database Connection
require('./connection').initDatabase(PORT, URI, app);



