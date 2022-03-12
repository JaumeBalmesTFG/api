const express = require("express");
const router = express.Router();

/**
 * CRUD
 */
router.post("/create", req, res => {
    //Check data is valid (name is not empty, color is not empty and is not white)
    //Set archived to false (IMPORTANT!! is it mandatory for frontend to send us an object with archive false or
    //do we do it by our self??)
    //Return message and code
});

router.get("/:module_id", req, res => {
    //Check that the module_id exists
    //Return all the data of the module_id
    //Return message and code
});

router.put("/:module_id/edit", req, res => {
    //Check that module_id exists and data is valid.
    //Return message and code
});

router.post("/:module_id/archive", req, res => {
    //Check that module_id exists, return !archive
});

/**
 * Data retrievers
 */
router.get("/all/archived", req, res => {
    //Return all modules that are archived by the user
    //If there are no modules archived, return message and code
});

router.get("/all/ufs", req, res => {
    //Return all modules with their ufs inside
    //In case the user does not have any module and uf, return message and code
});

router.get("/all", req, res => {
    //THE BEAST
    //Return all modules with their ufs inside. Inside the ufs, return all the tasks and all the rules, also
    //Return the number of truancies of the uf (number of hours not just a SUM of registers) as an int called "numTruancies"
});

module.exports = router;