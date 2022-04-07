const express = require("express");
const router = express.Router();

// Controllers
const {
    remove,
    create,
    update,
    get,
} = require('../../controllers/truancy/truancyController');

// Middlewares
const { isAuthenticated } = require('../../middlewares/auth/authentication');
const { validateTruancySchema } = require('../../middlewares/truancy/truancyValidator');

// Auth
router.use(isAuthenticated);

/**
 * CRUD
 */
router.post("/create", validateTruancySchema, create);
router.put("/:truancy_id/edit", validateTruancySchema, update);
router.get("/:truancy_id", get);
router.delete("/:truancy_id/delete", remove);
module.exports = router;