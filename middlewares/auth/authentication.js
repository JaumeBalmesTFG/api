// Private Route Validator

const { checkToken } = require('../../services/token');
const { HttpStatusCode, HttpStatusMessage, ResponseMessage } = require('../../config/status-codes');

exports.isAuthenticated = async function (req, res, next) {


    let authHeader = req.get('Authorization');

    console.log(authHeader);

    if (authHeader) {
        const token = authHeader.replace('Bearer', '').trim();
        const decoded = await checkToken(token);

        if (decoded) {
            req.authUserId = decoded._id;
            req.email = decoded.email;
            return next();
        }
    }

    return res.status(HttpStatusCode.UNAUTHORIZED).send({
        message: HttpStatusMessage.UNAUTHORIZED,
        path: req.originalUrl,
        method: req.method,
    });
};

