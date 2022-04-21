const express = require('express');
const router = express.Router();

// Private Route Auth
const {
    isAuthenticated
} = require('../middlewares/auth/authentication');


router.post("/", function(req, res, next){
    return res.send(req.body);
});

module.exports = router;    