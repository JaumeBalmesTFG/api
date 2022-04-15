// Task Schema Validator

const Joi = require('joi');

// Status messages and errors
const {
    HttpStatusCode,
    HttpStatusMessage,
    ResponseMessage
} = require('../../config/status-codes');

let taskSchema = Joi.object({
    ufId: Joi.string()
        .pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
        .min(1)
        .required()
        .messages({
            "string.base": `"UfId" should be a type of 'text'`,
            "string.empty": `"UfId" cannot be an empty field`,
            "any.required": `"UfId" is a required field`
        }),

    name: Joi.string()
        .pattern(/^[A-z0-9\s]+$/)
        .min(1)
        .required()
        .messages({
            "string.base": `"Name" should be a type of 'text'`,
            "string.empty": `"Name" cannot be an empty field`,
            "string.min": `"Name" should have a minimum length of {#limit}`,
            "any.required": `"Name" is a required field`
        }),

    description: Joi.string()
        .pattern(/^[A-z0-9\s]+$/)
        .min(1)
        .required()
        .messages({
            "string.base": `"Description" should be a type of 'text'`,
            "string.empty": `"Description" cannot be an empty field`,
            "string.min": `"Description" should have a minimum length of {#limit}`,
            "any.required": `"Description" is a required field`
        }),

    grade: Joi.number()
        .required()
        .min(1)
        .messages({
            "string.base": `"UfId" should be a type of 'number'`,
            "string.empty": `"UfId" cannot be an empty field`,
            "any.required": `"UfId" is a required field`
        }),

    dueDate: Joi.date()
        .required()
        .messages({
            "string.base": `"dueDate" should be a type of 'Date'`,
            "string.empty": `"dueDate" cannot be an empty field`,
            "any.required": `"dueDate" is a required field`
        }),
});

exports.validateTaskSchema = async function (req, res, next) {
    await taskSchema.validateAsync(req.body)
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
};