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

    const token = await jwt.sign({ user: 'admin' }, secret, {expiresIn: '2h'});

    return res.send({
        token: token
    });
});

router.get("/:token", async function (req, res, next) {

    jwt.verify(req.params.token, secret, function (err, token) {

        if (err || (Date.now() >= token.exp * 1000)) {
            return res.redirect('/test/login');
        }
    
        return res.sendFile("mochawesome.html", {root: 'public'});
    });
});



module.exports = router;    