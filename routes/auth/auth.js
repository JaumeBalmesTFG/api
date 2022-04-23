const express = require("express");
const router = express.Router();

// Controllers
const auth = require('../../controllers/auth/authController');

// Middlewares
const { validateUserSchema } = require('../../middlewares/user/userRegisterValidator');
const { validateUserLoginSchema } = require("../../middlewares/user/userLoginValidator");
const { validateAuthSchema } = require("../../middlewares/user/authValidator");

/** Auth Routes **/
router.post("/register", validateUserSchema, auth.registerController);
router.post("/login", validateUserLoginSchema, auth.loginController);
router.post("/auth", validateAuthSchema, auth.authController);
module.exports = router;