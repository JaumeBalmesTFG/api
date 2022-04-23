const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const secret = 'testsecret';

router.get("/login", function(req, res, next){
    return res.sendFile('login.html', {root: 'views'});
});

router.post("/login", async function(req, res, next){
    
    if(!(req.body.username === "admin" && req.body.password === "klendar")){
        return res.sendStatus(401);
    }

    const token = await jwt.sign({ user: 'admin' }, secret, {expiresIn: '10h'});

    return res.send({
        token: token
    });
});

router.get("/:token", async function (req, res, next) {

    const token = jwt.verify(req.params.token, secret);

    if (Date.now() >= token.exp * 1000 && token) {
        return res.redirect('/test/login');
    }

    return res.sendFile("mochawesome.html", {root: 'public'});
});



module.exports = router;    