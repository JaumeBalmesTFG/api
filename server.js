'use strict'

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
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
const calendarRouter = require("./routes/calendar/calendar");
const testRouter = require('./routes/test');


// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});*/

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
app.use("/calendar", calendarRouter);

db.connect()
    .then(function(){
        app.listen(PORT, function(){
            console.log(`> [CTRL+] http://localhost:${PORT}`);
        })
    });


// Database Connection
//require('./connection').initDatabase(PORT, URI, app);

module.exports = app;