
const {
    HttpStatusCode,
    ResponseMessage, HttpStatusMessage
} = require('../../../config/status-codes');

// Uf
const Uf = require('../../../models/uf/Uf');
const Module = require("../../../models/module/Module");

exports.validateModuleFromUfExistsAndIsFromRequestUser = async function (req, res, next) {
    let ufId = req.body.ufId != null ? req.body.ufId : req.params.uf_id;
    let moduleId;
    Uf.findOne({ _id: ufId}, function (err, doc) {
        if (err || doc == null) { //CHECK
            return res.status(HttpStatusCode.NOT_FOUND).send({
                message: HttpStatusMessage.NOT_FOUND,
                path: req.originalUrl,
                method: req.method,
                body: doc,
            });
        }
        moduleId = doc.moduleId;
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
                    message: ResponseMessage.UF_NOT_EXISTS_OR_USER_IS_NOT_OWNER,
                    path: req.originalUrl,
                    method: req.method,
                    body: doc
                });
            }
            next();
        });
    });


}