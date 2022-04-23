const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;
const fs = require('fs');

router.get("/", async function (req, res, next) {
    try {
        await exec('npm run test:awesome');
        return res.sendFile("mochawesome.html", { root: 'mochawesome-report' });
    } catch (e) {
        console.error(e); // should contain code (exit code) and signal (that caused the termination).
    }
});

router.get("/login", function(req, res, next){
    return res.sendFile('login.html', {root: 'views'});
});

module.exports = router;    