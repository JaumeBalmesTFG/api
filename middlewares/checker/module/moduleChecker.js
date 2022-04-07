// Check that module exists and is from the request user
// Status messages and errors
const {
    HttpStatusCode,
    ResponseMessage, HttpStatusMessage
} = require('../../../config/status-codes');

// Modules
const Module = require("../../../models/module/Module");

exports.validateModuleExistsAndIsFromRequestUser = async function (req, res, next) {
    Module.findOne({ _id: req.body.moduleId, authorId: req.params.authUserId }, function (err, doc) {
        if (err) {
            return res.status(HttpStatusCode.NOT_FOUND).send({
                message: ResponseMessage.NOT_EXISTS,
                path: req.originalUrl,
                method: req.method,
                body: doc,
            });
        }
        next();
    });
}