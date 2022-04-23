// Check that module exists and is from the request user
// Status messages and errors
const {
    HttpStatusCode,
    ResponseMessage, HttpStatusMessage
} = require('../../../config/status-codes');

// Modules
const Module = require("../../../models/module/Module");

exports.validateModuleExistsAndIsFromRequestUser = async function (req, res, next) {
    let moduleId = req.body.moduleId != null ? req.body.moduleId : req.params.module_id;
    Module.findOne({ _id: moduleId, authorId: res.locals.authUserId }, function (err, doc) {
        if (err) {
            return res.status(HttpStatusCode.NOT_FOUND).send({
                message: ResponseMessage.NOT_EXISTS,
                path: req.originalUrl,
                method: req.method,
                body: doc,
            });
        } else if (doc == null) {
            return res.status(HttpStatusCode.UNAUTHORIZED).send({
                message: ResponseMessage.MODULE_NOT_EXISTS_OR_USER_IS_NOT_OWNER,
                path: req.originalUrl,
                method: req.method,
                body: doc
            });
        }
        next();
    });
}