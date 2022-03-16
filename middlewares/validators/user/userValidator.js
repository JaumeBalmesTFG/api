// User Schema Validator

const Joi = require('joi');

// Status messages and errors
const {
    HttpStatusCode,
    HttpStatusMessage,
} = require('../../../config/status-codes');

const userSchema = Joi.object({
    // .pattern(/^[a-z]+$/) ONLY LETTERS
    firstName: Joi.string()
        .pattern(/^[a-z]+$/)
        .min(1)
        .max(25)
        .required()
        .messages({
            "string.base": `"First Name" should be a type of 'text'`,
            "string.empty": `"First Name" cannot be an empty field`,
            "string.min": `"First Name" should have a minimum length of {#limit}`,
            "string.max": `"First Name" should have a maximum length of {#limit}`,
            "any.required": `"First Name" is a required field`
        }),

    lastName: Joi.string()
        .pattern(/^[a-z]+$/)
        .min(1)
        .max(25)
        .required()
        .messages({
            "string.base": `"Last Name" should be a type of 'text'`,
            "string.empty": `"Last Name" cannot be an empty field`,
            "string.min": `"Last Name" should have a minimum length of {#limit}`,
            "string.max": `"Last Name" should have a maximum length of {#limit}`,
            "any.required": `"Last Name" is a required field`
        }),

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
            "string.pattern.base": `"Password" must have lowercase, uppercase and numbers, special characters are optional`,
        })
});

exports.validateUserSchema = async function (req, res, next) {
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