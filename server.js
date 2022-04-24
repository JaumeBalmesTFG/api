'use strict'

const express = require('express');
const app = express();
const path = require('path');

// Petition Debugger
const morgan = require('morgan');

// Config
const { PORT, URI } = require('./config/config');
const { HttpStatusCode, HttpStatusMessage } = require('./config/status-codes');

// Connection
const db = require('./connection');

/**
 * Custom Routers
 */
const authRouter = require("./routes/auth/auth"); //Pending
const moduleRouter = require("./routes/module/module");
const ruleRouter = require("./routes/rule/rule");
const taskRouter = require("./routes/task/task");
const truancyRouter = require("./routes/truancy/truancy");
const ufRouter = require("./routes/uf/uf");
const testRouter = require('./routes/test');


// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Mochawesome
app.use('/test', express.static(__dirname + '/public/mocha'));

// Testing endpoint
app.get('/', function (req, res) {
    return res.status(HttpStatusCode.OK).send(HttpStatusMessage.OK);
});

/** Routes */
app.use("/module", moduleRouter);
app.use("/rule", ruleRouter);
app.use("/task", taskRouter);
app.use("/truancy", truancyRouter);
app.use("/uf", ufRouter);
app.use("/test", testRouter);
app.use("/", authRouter);


db.connect()
    .then(function(){
        app.listen(PORT, function(){
            console.log(`> [CTRL+] http://localhost:${PORT}`);
        })
    });


// Database Connection
//require('./connection').initDatabase(PORT, URI, app);

module.exports = app;