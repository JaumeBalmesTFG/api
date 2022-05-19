// Rule Model
const Rule = require('../../models/rule/Rule');
const Task = require('../../models/task/Task');

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

// Create Rule
exports.create = async function (req, res, next) {

    const { ufId, title, percentage } = req.body;

    const newRule = new Rule({
        ufId: ufId,
        title: title,
        percentage: percentage
    });

    await newRule.save(function (err, doc) {

        return res.status(HttpStatusCode.CREATED).send({
            message: 'RULE_' + ResponseMessage.CREATED,
            path: req.originalUrl,
            method: req.method,
            body: doc,
        });
    });
}

// Get Rule
exports.get = async function (req, res, next) {

    if(!checkPathObjectId(req.params.rule_id)){
        return res.status(HttpStatusCode.BAD_REQUEST).send({
            message: HttpStatusMessage.BAD_REQUEST,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    Rule.findOne({ _id: req.params.rule_id }, function (err, doc) {
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

// Get All Rules From Uf
exports.getAll = async function (req, res, next) {
    if(!checkPathObjectId(req.params.uf_id)){
        return res.status(HttpStatusCode.BAD_REQUEST).send({
            message: HttpStatusMessage.BAD_REQUEST,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    Rule.find({ ufId: req.params.uf_id }, function (err, doc) {
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

// Get All Rules From Uf
exports.isTasksInThisRule = async function (req, res, next) {

    if(!checkPathObjectId(req.params.rule_id)){
        return res.status(HttpStatusCode.BAD_REQUEST).send({
            message: HttpStatusMessage.BAD_REQUEST,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    Task.find({ ruleId: req.params.rule_id }, function (err, doc) {
        if (err) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                message: ResponseMessage.DATABASE_ERROR,
                path: req.originalUrl,
                method: req.method,
                body: doc,
            });
        }

        if(doc.length > 0){
            return res.status(HttpStatusCode.OK).send({
                message: HttpStatusMessage.OK,
                path: req.originalUrl,
                method: req.method,
                body: true,
            });
        }

        return res.status(HttpStatusCode.OK).send({
            message: HttpStatusMessage.OK,
            path: req.originalUrl,
            method: req.method,
            body: false,
        });
    });
}

// Update Rule
exports.update = async function (req, res, next) {

    if(!checkPathObjectId(req.params.rule_id)){
        return res.status(HttpStatusCode.NOT_ACCEPTABLE).send({
            message: HttpStatusMessage.NOT_ACCEPTABLE,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    const { title, percentage } = req.body;

    const doc = await Rule.findOne({ _id: req.params.rule_id});

    if(!doc){
        return res.status(HttpStatusCode.NOT_FOUND).send({
            message: HttpStatusMessage.NOT_FOUND,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    doc.title = title;
    doc.percentage = percentage;

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

// Delete Rule
exports.remove = async function (req, res, next) {

    if(!checkPathObjectId(req.params.rule_id)){
        return res.status(HttpStatusCode.BAD_REQUEST).send({
            message: HttpStatusMessage.BAD_REQUEST,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    const match = await Rule.findOne({  _id: req.params.rule_id });

    if(!match){
        return res.status(HttpStatusCode.NOT_FOUND).send({
            message: HttpStatusMessage.NOT_FOUND,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    await match.delete(function(err, doc){
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
