const express = require("express");
const router = express.Router();

// Controllers
const {
    create,
    update,
    get,
    remove
} = require('../../controllers/uf/ufController');

// Middlewares
const { isAuthenticated } = require('../../middlewares/auth/authentication');
const { validateUfSchema } = require('../../middlewares/uf/ufValidator');
const { validateModuleExistsAndIsFromRequestUser } = require ('../../middlewares/checker/module/moduleChecker')
const {validateModuleFromUfExistsAndIsFromRequestUser} = require("../../middlewares/checker/uf/ufChecker");

// Auth
router.use(isAuthenticated);

/**
 * CRUD
 */
router.post("/create", [validateUfSchema, validateModuleExistsAndIsFromRequestUser], create);
router.get("/:uf_id", validateModuleFromUfExistsAndIsFromRequestUser, get);
router.put("/:uf_id/edit", [validateUfSchema, validateModuleExistsAndIsFromRequestUser, validateModuleFromUfExistsAndIsFromRequestUser], update);
router.delete("/:uf_id/delete", validateModuleFromUfExistsAndIsFromRequestUser, remove);

module.exports = router;