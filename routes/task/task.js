const express = require("express");
const router = express.Router();

// Controller
const {
    create
} = require('../../controllers/task/taskController');

// Middleware
const {
    isAuthenticatedPrivate
} = require('../../middlewares/auth/authentication');

router.use(isAuthenticatedPrivate);

// Routes
router.post("/", create);
router.get("/:task_id", function(req, res) {
    //Return all the data of the task_id after checking it exists
    //Return message and code
});

router.put("/:task_id/edit", function(req, res) {
    //Check that task_id exists and data is valid.
    //Return message and code
});

router.delete("/:task_id/delete", function(req, res) {
    //check that task_id exists and delete it
});

module.exports = router;