const express = require("express");
const router = express.Router();

// Controller
const { create, update, remove, get } = require('../../controllers/task/taskController');

// Middleware
const { isAuthenticated } = require('../../middlewares/auth/authentication');

// Checkers
const { validateUfExistsAndIsFromRequestUser } = require('../../middlewares/checker/uf/ufChecker');

router.use(isAuthenticated);

// Routes
router.post("/", create);
router.get("/:task_id", get);
router.put("/:task_id", update);
router.delete("/:task_id", remove);

module.exports = router;