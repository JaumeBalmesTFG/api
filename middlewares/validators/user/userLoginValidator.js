//UserLogin Schema Validator

const Joi = require('joi');

// Status messages and errors
const {
    HttpStatusCode,
    HttpStatusMessage,
} = require('../../../config/status-codes');

const userSchema = Joi.object({

    email: Joi.string()
        .email()
        .required(),

    // Min 6 chars, lowercase, uppercase, numbers is required, special chars are optional
    password: Joi.string()
        .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*?]{6,30}$/)
        .required()
        .messages({
            "string.base": `"Password" should be a type of 'text'`,
            "string.empty": `"Password" cannot be an empty field`,
            "string.pattern.base": `"Password" must have lowercase, uppercase and numbers`,
        })
});

exports.validateUserLoginSchema = async function (req, res, next) {
    await userSchema.validateAsync(req.body)
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