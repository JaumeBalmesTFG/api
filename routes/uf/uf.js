const express = require("express");
const router = express.Router();

router.post("/create", req, res => {
    //Check data is valid (Compare with the model)
    //Return message and code
});

router.get("/:uf_id", req, res => {
    //Return all the data of the uf_id after checking it exists
    //Return message and code
});

router.put("/:uf_id/edit", req, res => {
    //Check that uf_id exists and data is valid.
    //Return message and code
});

module.exports = router;