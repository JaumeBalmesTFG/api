const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { execSync } = require('child_process');

const secret = '8X!?m+cL2Fw]-yAm7G>%ePPQp}0VH0igHzIBma1,vtJJUV)$w0}Yq[l5wf$sb7)';

// Functions
async function execTests() {
    try {
        await execSync('npm run test:awesome');
        return true;
    } catch (error) {
        return false;
    }
}


// Tests

router.get("/", function (req, res, next) {
    return res.sendFile('login.html', { root: 'public/views' });
});

router.post("/login", async function (req, res, next) {

    if (!(req.body.username === "admin" && req.body.password === "klendar")) {
        return res.sendStatus(401);
    }

    const token = await jwt.sign({ user: 'admin' }, secret, { expiresIn: '7d' });

    return res.send({
        token: token
    });
});

router.get("/:token", async function (req, res, next) {

    try {

        const decoded = jwt.verify(req.params.token, secret);

        if (!decoded || (Date.now() >= decoded.exp * 1000)) {
            throw new Error;
        }

    } catch (error) {
        console.log("Error 2: " + error);
        return res.redirect('/test');
    }


    if (!execTests()) {
        return res.send('error on tests');
    };

    return res.sendFile("mochawesome.html", { root: 'public/mocha' });
});

module.exports = router;    