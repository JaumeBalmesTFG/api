const express = require("express");
const router = express.Router();

router.post("/auth", req, res => {
    //Check if req email is in db
    //Return json with "action": "login|register" format
});

router.post("/register", req, res => {
    //Check that all the data is valid (no empty data in comparation with the model and email is well formatted).
    //Check that user does not exist
    //Store user
    //Return message and code
});

router.post("/login", req, res => {
    //Check that email and password are correct
    //Return token & code
});

module.exports = router;