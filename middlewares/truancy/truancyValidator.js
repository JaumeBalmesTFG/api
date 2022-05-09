// Create and Update Truancy Schema Validator

const Joi = require('joi');

// Status messages and errors
const {
    HttpStatusCode,
    HttpStatusMessage
} = require('../../config/status-codes');

let truancySchema = Joi.object({

    moduleId: Joi.string()
        .pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
        .min(1)
        .required()
        .messages({
            "string.base": `"moduleId" should be a type of 'text'`,
            "string.empty": `"moduleId" cannot be an empty field`,
            "string.min": `"moduleId" should have a minimum length of {#limit}`,
            "any.required": `"moduleId" is a required field`
        }),

    ufId: Joi.string()
        .pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
        .min(1)
        .required()
        .messages({
            "string.base": `"ufId" should be a type of 'text'`,
            "string.empty": `"ufId" cannot be an empty field`,
            "string.min": `"ufId" should have a minimum length of {#limit}`,
            "any.required": `"ufId" is a required field`
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
            "number.empty": `"Hours" cannot be an empty field`,
            "number.required": `"Hours" is a required field`
        })
});

exports.validateTruancySchema = async function (req, res, next) {
    await truancySchema.validateAsync(req.body)
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