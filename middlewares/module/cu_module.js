// Create and Update Module Schema Validator

const Joi = require('joi');

// Status messages and errors
const {
    HttpStatusCode,
    HttpStatusMessage,
    ResponseMessage
} = require('../../config/status-codes');

const moduleSchema = Joi.object({
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

    color: Joi.string()
        .pattern(/^#([A-F0-9]{6}|[A-F0-9]{3})$/)
        .min(7)
        .max(7)
        .required()
        .messages({
            "string.base": `"Color" should be a type of '#hexadecimal'`,
            "string.empty": `"Color" cannot be an empty field`,
            "string.min": `"Color" should have a minimum length of {#limit}`,
            "string.max": `"Color" should have a maximum length of {#limit}`,
            "any.required": `"Color" is a required field`
        })
});

exports.validateModuleSchema = async function(req, res, next) {
    await moduleSchema.validateAsync(req.body)
        .then(function() { return next(); })
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