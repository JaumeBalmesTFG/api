// Create and Update Truancy Schema Validator

const Joi = require('joi');

// Status messages and errors
const {
    HttpStatusCode,
    HttpStatusMessage,
    ResponseMessage
} = require('../../config/status-codes');

let moduleSchema = Joi.object({
    ufId: Joi.string()
        .pattern(/^[A-z0-9\s]+$/)
        .min(1)
        .required()
        .messages({
            "string.base": `"Name" should be a type of 'text'`,
            "string.empty": `"Name" cannot be an empty field`,
            "string.min": `"Name" should have a minimum length of {#limit}`,
            "any.required": `"Name" is a required field`
        }),

    date: Joi.date()
        .required()
        .messages({
            "date.empty": `"Date" cannot be an empty field`,
            "date.required": `"Date" is a required field`
        }),

    reason: Joi.string()
        .messages({}),

    hours: Joi.number()
        .required()
        .messages({
            "date.empty": `"Hours" cannot be an empty field`,
            "date.required": `"Hours" is a required field`
        })
});

exports.validateTruancySchema = async function (req, res, next) {
    await validateTruancySchema.validateAsync(req.body)
        .then(function () { return next(); })
        .catch(function (err) {
            return res.status(HttpStatusCode.NOT_ACCEPTABLE).send({
                error: err.details[0].message,
                message: HttpStatusMessage.NOT_ACCEPTABLE,
                path: req.path,
                method: req.method,
                body: req.body
            });
        });
}