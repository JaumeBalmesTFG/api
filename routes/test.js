const express = require('express');
const path = require('path');
const router = express.Router();

function run(cmd, callback) {
    var spawn = require('child_process').spawn;
    var command = spawn(cmd);
    var result = '';
    command.stdout.on('data', function(data) {
         result += data.toString();
    });
    command.on('close', function(code) {
        return callback(result);
    });
}

router.get("/", function (req, res, next) {
    res.sendFile("mochawesome.html", {root: 'mochawesome-report'});
});

module.exports = router;    