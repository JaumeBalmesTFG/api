const express = require("express");
const router = express.Router();

// Controllers
const {
    create,
    update,
    get
} = require('../../controllers/uf/ufController');

// Middlewares
const { isAuthenticatedPrivate } = require('../../middlewares/auth/authentication');
const { validateUfSchema } = require('../../middlewares/uf/ufValidator');

// Auth
router.use(isAuthenticatedPrivate);

/**
 * CRUD
 */
router.post("/create", validateUfSchema, create);
router.get("/:uf_id", get);
router.put("/:uf_id/edit", validateUfSchema, update);

module.exports = router;