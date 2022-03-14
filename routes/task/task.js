const express = require("express");
const router = express.Router();

router.post("/create", function(req, res) {
    //Check data is valid (Compare with the model)
    //Return message and code
});

router.get("/:task_id", function(req, res) {
    //Return all the data of the task_id after checking it exists
    //Return message and code
});

router.put("/:task_id/edit", function(req, res) {
    //Check that task_id exists and data is valid.
    //Return message and code
});

router.delete("/:task_id/delete", function(req, res) {
    //check that task_id exists and delete it
});

module.exports = router;