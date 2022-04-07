
const {
    HttpStatusCode,
    ResponseMessage, HttpStatusMessage
} = require('../../../config/status-codes');

// Uf
const Uf = require('../../../models/uf/Uf');

exports.validateUfExistsAndIsFromRequestUser = async function (req, res, next) {
    Uf.findOne({ _id: req.body.ufId, authorId: req.params.authUserId }, function (err, doc) {
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