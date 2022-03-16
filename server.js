'use strict'

const express = require('express');
const app = express();

// Petition Debugger
const morgan = require('morgan');

// Config
const {PORT, URI} = require('./config/config');
const {HttpStatusCode, HttpStatusMessage} = require('./config/status-codes');

// Controllers
const auth = require('./controllers/auth/authController');

/**
 * Custom Routers
 */

//const authRouter = require("./routes/auth/auth"); //Pending
const moduleRouter = require("./routes/module/module");
const ruleRouter = require("./routes/rule/rule");
const taskRouter = require("./routes/task/task");
const truancyRouter = require("./routes/truancy/truancy");
const ufRouter = require("./routes/uf/uf");


// Middlewares
const {validateUserSchema} = require('./middlewares/validators/user/userValidator');
const {validateUserLoginSchema} = require("./middlewares/validators/user/userLoginValidator");
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
 * auth routes (Pending to move to a single file)
 */
app.post("/auth", function(req, res) {
    //Check if req email is in db
    //Return json with "action": "login|register" format
});

app.post("/register", validateUserSchema, auth.registerController);

app.post("/login", validateUserLoginSchema, auth.loginController);

// Testing endpoint
app.get('/', function (req, res) {
    res.status(HttpStatusCode.OK).send(HttpStatusMessage.OK);
});

// Database Connection
require('./connection').initDatabase(PORT, URI, app);


module.exports = app;