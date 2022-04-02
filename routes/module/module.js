const express = require("express");
const router = express.Router();

// Controllers
const {
    create,
    update,
    get,
    archive
} = require('../../controllers/module/moduleController');

/**
 * CRUD
 */
router.post("/", create);
router.put("/:module_id", update);
router.get("/:module_id", get);
router.post("/:module_id/archive", archive);

/**
 * Data retrievers
 */
router.get("/all/archived", function(req, res) {
    //Return all modules that are archived by the user
    //If there are no modules archived, return message and code
});

router.get("/all/ufs", function(req, res) {
    //Return all modules with their ufs inside
    //In case the user does not have any module and uf, return message and code
});

router.get("/all", function(req, res) {
    //THE BEAST
    //Return all modules with their ufs inside. Inside the ufs, return all the tasks and all the rules, also
    //Return the number of truancies of the uf (number of hours not just a SUM of registers) as an int called "numTruancies"
});

module.exports = router;