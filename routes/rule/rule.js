const express = require("express");
const router = express.Router();

// Controllers
const {
    remove,
    create,
    update,
    get,
    getAll
} = require('../../controllers/rule/ruleController');

// Middlewares
const { isAuthenticated } = require('../../middlewares/auth/authentication');
const { validateRuleSchema } = require('../../middlewares/rule/ruleValidator');

// Auth
router.use(isAuthenticated);

/**
 * CRUD
 */
router.post("/create", validateRuleSchema, create);
router.put("/:rule_id/edit", validateRuleSchema, update);
router.get("/:rule_id", get);
router.delete("/:rule_id/delete", remove);
router.get('/uf/:uf_id', getAll);
module.exports = router;