'use strict'

const express = require('express');
const app = new express();

// Testing endpoint
app.get('/', function (req, res) {
    res.send("I'm working correctly :)");
});

// TODO: The port must be in a config file
app.listen(8080, () => {
   console.log('Listening on port 8080');
});
