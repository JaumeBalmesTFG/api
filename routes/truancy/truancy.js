const express = require("express");
const router = express.Router();

router.post("/create", req, res => {
    //Check data is valid (Compare with the model)
    //Return message and code
});

router.get("/:truancy_id", req, res => {
    //Return all the data of the truancy_id after checking it exists
    //Return message and code
});

router.put("/:truancy_id/edit", req, res => {
    //Check that truancy_id exists and data is valid.
    //Return message and code
});

router.delete("/:truancy_id/delete", req, res => {
    //check that truancy_id exsits and delete it
});

module.exports = router;