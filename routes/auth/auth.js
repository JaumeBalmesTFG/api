const express = require("express");
const router = express.Router();

// Controllers
const auth = require('../../controllers/auth/authController');

// Middlewares
const { validateUserSchema } = require('../../middlewares/validators/user/userValidator');
const { validateUserLoginSchema } = require("../../middlewares/validators/user/userLoginValidator");
const { isAuthenticatedPublic } = require('../../middlewares/auth/authentication');

/** Auth Routes **/

// Check if user is not authenticated
router.use(isAuthenticatedPublic)

router.post("/auth", function (req, res) {
    //Check if req email is in db
    //Return json with "action": "login|register" format
});

router.post("/register", validateUserSchema, auth.registerController);
router.post("/login", validateUserLoginSchema, auth.loginController);

module.exports = router;