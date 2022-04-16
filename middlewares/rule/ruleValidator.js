// Create and Update Rule Schema Validator

const Joi = require('joi');

// Status messages and errors
const {
    HttpStatusCode,
    HttpStatusMessage
} = require('../../config/status-codes');

let ruleSchema = Joi.object({
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

    title: Joi.string()
        .required()
        .messages({
            "string.base": `"Title" should be a type of '#boolean'`,
            "string.empty": `"Title" cannot be an empty field`,
            "string.min": `"Title" should have a minimum length of {#limit}`,
            "string.max": `"Title" should have a maximum length of {#limit}`,
            "any.required": `"Title" is a required field`
        }),

    percentage: Joi.number()
        .required()
        .messages({
            "date.empty": `"Percentage" cannot be an empty field`,
            "date.required": `"Percentage" is a required field`
        })
});

exports.validateRuleSchema = async function (req, res, next) {
    await ruleSchema.validateAsync(req.body)
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