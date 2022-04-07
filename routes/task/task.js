const express = require("express");
const router = express.Router();

// Controller
const { create, update } = require('../../controllers/task/taskController');

// Middleware
const { isAuthenticated } = require('../../middlewares/auth/authentication');

// Checkers
const { validateUfExistsAndIsFromRequestUser } = require('../../middlewares/checker/uf/ufChecker');

router.use(isAuthenticated);

// Routes
router.post("/", create);
router.get("/:task_id", function(req, res) {
    //Return all the data of the task_id after checking it exists
    //Return message and code
});

router.put("/:task_id", update);

router.delete("/:task_id/delete", function(req, res) {
    //check that task_id exists and delete it
});

module.exports = router;