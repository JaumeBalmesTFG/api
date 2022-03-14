const express = require("express");
const router = express.Router();

router.post("/create", function(req, res) {
    //Check data is valid (Compare with the model)
    //Return message and code
});

router.get("/:rule_id", function(req, res) {
    //Return all the data of the rule_id after checking it exists
    //Return message and code
});

router.put("/:rule_id/edit", function(req, res) {
    //Check that rule_id exists and data is valid.
    //Return message and code
});

router.delete("/:rule_id/delete", function(req, res) {
    //check that rule_id exists and delete it
});

router.get("/uf/:uf_id", function(req, res) {
    //Check that uf exists
    //Return all rules of the uf
    //If uf does not have any rule, return message
});

module.exports = router;