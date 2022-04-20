//UserLogin Schema Validator

const Joi = require('joi');

// Status messages and errors
const {
    HttpStatusCode,
    HttpStatusMessage,
} = require('../../config/status-codes');

const authSchema = Joi.object({

    email: Joi.string()
        .email()
        .required()
});

exports.validateAuthSchema = async function (req, res, next) {
    await authSchema.validateAsync(req.body)
        .then(function () { return next(); })
        .catch(function (err) {
            return res.status(HttpStatusCode.NOT_ACCEPTABLE).send({
                error: HttpStatusMessage.NOT_ACCEPTABLE,
                message: err.details[0].message,
                path: req.path,
                method: req.method,
                body: req.body
            });
        });
};