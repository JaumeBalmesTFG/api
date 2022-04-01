const express = require('express');
const router = express.Router();

// Private Route Auth
const {
    isAuthenticatedPrivate
} = require('../middlewares/auth/authentication');

router.use(isAuthenticatedPrivate);

router.post("/", function(req, res, next){
    return res.send(req.body);
});

module.exports = router;