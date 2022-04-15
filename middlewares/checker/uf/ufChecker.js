
const {
    HttpStatusCode,
    ResponseMessage, HttpStatusMessage
} = require('../../../config/status-codes');

// Uf
const Uf = require('../../../models/uf/Uf');

exports.validateUfExistsAndIsFromRequestUser = async function (req, res, next) {
    Uf.findOne({ _id: req.body.ufId, authorId: req.authUserId }, function (err, doc) {
        if (err || !doc) {
            return res.status(HttpStatusCode.NOT_FOUND).send({
                message: HttpStatusMessage.NOT_FOUND,
                path: req.originalUrl,
                method: req.method,
                body: doc,
            });
        }
        next();
    });
}