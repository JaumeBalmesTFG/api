// Module Model
const Module = require('../../models/module/Module');

// Status Messages
const {
    HttpStatusCode,
    HttpStatusMessage,
    ResponseMessage
} = require('../../config/status-codes');

// Checker
const {
    checkPathObjectId
} = require('../../services/checker');

// Create Module
exports.create = async function (req, res, next) {

    console.log("entry");

    const { name, color } = req.body;

    const match = await Module.findOne({
        authorId: req.authUserId,
        name: name
    });

    if (match) {
        return res.status(HttpStatusCode.CONFLICT).send({
            message: ResponseMessage.ALREADY_EXISTS,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    const newModule = new Module({
        authorId: req.authUserId,
        name: name,
        color: color
    });

    await newModule.save(function (err, doc) {
        if (err) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                error: ResponseMessage.DATABASE_ERROR,
                path: req.originalUrl,
                method: req.method,
                body: req.body
            });
        }

        return res.status(HttpStatusCode.CREATED).send({
            message: 'MODULE_' + ResponseMessage.CREATED,
            path: req.originalUrl,
            method: req.method,
            body: doc,
        });
    });
}

// Get All Modules
exports.get = async function (req, res, next) {

    if(!checkPathObjectId(req.params.module_id)){
        return res.status(HttpStatusCode.BAD_REQUEST).send({
            message: HttpStatusMessage.BAD_REQUEST,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    Module.findOne({ _id: req.params.module_id }, function (err, doc) {
        if (err) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                message: ResponseMessage.DATABASE_ERROR,
                path: req.originalUrl,
                method: req.method,
                body: doc,
            });
        }

        return res.status(HttpStatusCode.OK).send({
            message: HttpStatusMessage.OK,
            path: req.originalUrl,
            method: req.method,
            body: doc,
        });
    });
}

// Update Module
exports.update = async function (req, res, next) {

    if(!checkPathObjectId(req.params.module_id)){
        return res.status(HttpStatusCode.BAD_REQUEST).send({
            message: HttpStatusMessage.BAD_REQUEST,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    const { name, color } = req.body;

    const match = await Module.findOne({ _id: req.params.module_id, authorId: req.authUserId, name: name });

    if(match){
        return res.status(HttpStatusCode.CONFLICT).send({
            message: ResponseMessage.ALREADY_EXISTS,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    const doc = await Module.findOne({ _id: req.params.module_id, authorId: req.authUserId });

    if(!doc){
        return res.status(HttpStatusCode.NOT_FOUND).send({
            message: HttpStatusMessage.NOT_FOUND,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    doc.name = name;
    doc.color = color;

    await doc.save(function (err, obj){
        if (err) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                error: ResponseMessage.DATABASE_ERROR,
                path: req.originalUrl,
                method: req.method,
                body: req.body
            });
        }

        return res.status(HttpStatusCode.OK).send({
            message: HttpStatusMessage.OK,
            path: req.originalUrl,
            method: req.method,
            body: obj,
        });
    });
}

// Archive Module
exports.archive = async function (req, res, next) {

    if(!checkPathObjectId(req.params.module_id)){
        return res.status(HttpStatusCode.BAD_REQUEST).send({
            message: HttpStatusMessage.BAD_REQUEST,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    const match = await Module.findOne({  _id: req.params.module_id, authorId: req.authUserId });

    if(!match){
        return res.status(HttpStatusCode.NOT_FOUND).send({
            message: HttpStatusMessage.NOT_FOUND,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    match.archived = req.body.archived;

    await match.save(function(err, doc){
        if (err) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                error: ResponseMessage.DATABASE_ERROR,
                path: req.originalUrl,
                method: req.method,
                body: req.body
            });
        }

        return res.status(HttpStatusCode.OK).send({
            message: HttpStatusMessage.OK,
            path: req.originalUrl,
            method: req.method,
            body: doc,
        });
    })
}
