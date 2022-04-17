const express = require("express");
const router = express.Router();

// Controller
const { create, update, remove, get } = require('../../controllers/task/taskController');

// Middleware
const { isAuthenticated } = require('../../middlewares/auth/authentication');
const { validateTaskSchema, validateExtendedTaskSchema } = require('../../middlewares/task/taskValidator');


// Checkers
const { validateModuleFromUfExistsAndIsFromRequestUser } = require('../../middlewares/checker/uf/ufChecker');

router.use(isAuthenticated);

// Routes
router.post("/create", validateTaskSchema, validateModuleFromUfExistsAndIsFromRequestUser, create);
router.put("/:task_id/edit", validateTaskSchema, validateModuleFromUfExistsAndIsFromRequestUser, update);
router.delete("/:task_id/delete", remove);
router.get("/:task_id", get);

module.exports = router;