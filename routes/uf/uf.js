const express = require("express");
const router = express.Router();

// Controllers
const {
    create,
    update,
    get
} = require('../../controllers/uf/ufController');

// Middlewares
const { isAuthenticated } = require('../../middlewares/auth/authentication');
const { validateUfSchema } = require('../../middlewares/uf/ufValidator');
const { validateModuleExistsAndIsFromRequestUser } = require ('../../middlewares/checker/module/moduleChecker')

// Auth
router.use(isAuthenticated);

/**
 * CRUD
 */
router.post("/create", [validateUfSchema, validateModuleExistsAndIsFromRequestUser], create);
router.get("/:uf_id", get);
router.put("/:uf_id/edit", [validateUfSchema, validateModuleExistsAndIsFromRequestUser], update);

module.exports = router;