const express = require("express");
const router = express.Router();

// Controllers
const calendar = require('../../controllers/calendar/calendarController');


const { isAuthenticated } = require('../../middlewares/auth/authentication');

// Auth
router.use(isAuthenticated);

/** Calendar Route **/
router.get("/", calendar.get);
module.exports = router;