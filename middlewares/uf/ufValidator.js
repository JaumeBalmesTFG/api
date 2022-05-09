// Create and Update UF Schema Validator

const Joi = require('joi');

// Status messages and errors
const {
    HttpStatusCode,
    HttpStatusMessage,
} = require('../../config/status-codes');

let ufSchema = Joi.object({

    moduleId: Joi.string()
        .pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
        .min(1)
        .required()
        .messages({
            "string.base": `"ModuleId" should be a type of 'text'`,
            "string.empty": `"ModuleId" cannot be an empty field`,
            "any.required": `"ModuleId" is a required field`
        }),


    name: Joi.string()
        .min(1)
        .required()
        .messages({
            "string.base": `"Name" should be a type of 'text'`,
            "string.empty": `"Name" cannot be an empty field`,
            "string.min": `"Name" should have a minimum length of {#limit}`,
            "any.required": `"Name" is a required field`
        }),

    hours: Joi.number()
        .positive()
        .required()
        .messages({
            "number.negative": `"Hours" has to be positive`,
            "number.empty": `"Hours" cannot be an empty field`,
            "number.required": `"Hours" is a required field`
        }),

    truancy_percentage: Joi.number()
        .min(1)
        .max(100)
        .positive()
        .required()
        .messages({
            "number.negative": `"Truancy Percentage" has to be positive`,
            "number.empty": `"Truancy Percentage" cannot be an empty field`,
            "number.required": `"Truancy Percentage" is a required field`,
            "number.min": `"Truancy Percentage" should be a number equal or higher than {#min}`,
            "number.max": `"Truancy Percentage should be a number equal or less than {#limit}"`

        }),
});

exports.validateUfSchema = async function (req, res, next) {
    await ufSchema.validateAsync(req.body)
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