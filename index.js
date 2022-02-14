'use strict'

const express = require('express');
const app = new express();

// Testing endpoint
app.get('/', function (req, res) {
    res.send("I'm working correctly :)");
});
