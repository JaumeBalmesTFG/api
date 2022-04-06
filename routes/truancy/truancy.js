const express = require("express");
const router = express.Router();

// Controllers
const {
    delete,
    create,
    update,
    get,
} = require('../../controllers/truancy/truancyController');

// Middlewares
const { isAuthenticatedPrivate } = require('../../middlewares/auth/authentication');
const { validateTruancySchema } = require('../../middlewares/truancy/truancyValidator');

// Auth
router.use(isAuthenticatedPrivate);

/**
 * CRUD
 */
router.post("/create", validateTruancySchema, create);
router.put("/:truancy_id", validateTruancySchema, update)
router.get("/:truancy_id", get);
router.delete("/:truancy_id/delete",





router.post("/create", function(req, res) {
    //Check data is valid (Compare with the model)
    //Return message and code
});

router.get("/:truancy_id", function(req, res) {
    //Return all the data of the truancy_id after checking it exists
    //Return message and code
});

router.put("/:truancy_id/edit", function(req, res) {
    //Check that truancy_id exists and data is valid.
    //Return message and code
});

router.delete("/:truancy_id/delete", function(req, res) {
    //check that truancy_id exsits and delete it
});

module.exports = router;