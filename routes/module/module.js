const express = require("express");
const router = express.Router();

// Controllers
const {
    create,
    update,
    get,
    archive,
    getAllArchived, 
    getAllUfsFromModules, 
    getAll
} = require('../../controllers/module/moduleController');

// Middlewares
const { isAuthenticated } = require('../../middlewares/auth/authentication');
const { validateModuleSchema, validateModuleArchivedSchema } = require('../../middlewares/module/moduleValidator');
const { validateModuleExistsAndIsFromRequestUser } = require ('../../middlewares/checker/module/moduleChecker')
// Auth
router.use(isAuthenticated);

/**
 * CRUD
 */
router.post("/", validateModuleSchema, create);
router.get("/all/archived", getAllArchived);
router.get("/all/ufs", getAllUfsFromModules);
router.get("/all", getAll);
router.put("/:module_id", [validateModuleSchema, validateModuleExistsAndIsFromRequestUser], update)
router.put("/:module_id/archive", validateModuleExistsAndIsFromRequestUser, archive);
router.get("/:module_id", validateModuleExistsAndIsFromRequestUser, get);

/**
 * Data retrievers
 */

router.get("/all/ufs", function (req, res) {
    //Return all modules with their ufs inside
    //In case the user does not have any module and uf, return message and code
});

//THE BEAST
//Return all modules with their ufs inside. Inside the ufs, return all the tasks and all the rules, also
//Return the number of truancies of the uf (number of hours not just a SUM of registers) as an int called "numTruancies"

module.exports = router;