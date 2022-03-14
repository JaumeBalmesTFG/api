'use strict'

const express = require('express');
const app = express();

// Petition Debugger
const morgan = require('morgan');

// Config
const {PORT, URI} = require('./config/config');
const {HttpStatusCode, HttpStatusMessage} = require('./config/status-codes');

/**
 * Custom Routers
 */

const authRouter = require("./routes/auth/auth"); //Pending
const moduleRouter = require("./routes/module/module");
const ruleRouter = require("./routes/rule/rule");
const taskRouter = require("./routes/task/task");
const truancyRouter = require("./routes/truancy/truancy");
const ufRouter = require("./routes/uf/uf");

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

/**
 * Routes
 */
app.use("/module", moduleRouter);
app.use("/rule", ruleRouter);
app.use("/task", taskRouter);
app.use("/truancy", truancyRouter);
app.use("/uf", ufRouter);

/**
 * Auth routes (Pending to move to a single file)
 */
app.post("/auth", req, res => {
    //Check if req email is in db
    //Return json with "action": "login|register" format
});

app.post("/register", req, res => {
    //Check that all the data is valid (no empty data in comparation with the model and email is well formatted).
    //Check that user does not exist
    //Store user
    //Return message and code
});

app.post("/login", req, res => {
    //Check that email and password are correct
    //Return token & code
});

// Testing endpoint
app.get('/', function (req, res) {
    res.status(HttpStatusCode.OK).send(HttpStatusMessage.OK);
});

// Database Connection
require('./connection').initDatabase(PORT, URI, app);



