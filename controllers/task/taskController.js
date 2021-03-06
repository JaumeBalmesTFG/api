// Task Model
const Uf = require('../../models/uf/Uf');
const Task = require('../../models/task/Task');
const Module = require('../../models/module/Module');

// Status Messages
const {
    HttpStatusCode,
    HttpStatusMessage,
    ResponseMessage
} = require('../../config/status-codes');

// Create
exports.create = async function (req, res, next) {

    const { moduleId, ufId, ruleId, name, grade, description, dueDate } = req.body;


    const matchUf = await Uf.findOne({ _id: ufId, authorId: res.locals.authUserId });

    if (!matchUf) {
        return res.status(HttpStatusCode.NOT_FOUND).send({
            message: HttpStatusMessage.NOT_FOUND,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    const matchModule = await Module.findOne({ _id: moduleId, authorId: res.locals.authUserId });

    if (!matchModule) {
        return res.status(HttpStatusCode.NOT_FOUND).send({
            message: HttpStatusMessage.NOT_FOUND,
            path: req.originalUrl,
            method: req.method,
            body: req.body,
        });
    }

    const newTask = new Task({
        authorId: res.locals.authUserId,
        moduleId: moduleId,
        ufId: ufId,
        ruleId: ruleId,
        name: name,
        grade: grade,
        description: description,
        dueDate: dueDate
    });

    newTask.save(function (err, doc) {
        if (err) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                error: ResponseMessage.DATABASE_ERROR,
                path: req.originalUrl,
                method: req.method,
                body: req.body
            });
        }

        return res.status(HttpStatusCode.CREATED).send({
            message: HttpStatusMessage.CREATED,
            path: req.originalUrl,
            method: req.method,
            body: doc,
        });
    });
}

exports.update = async function (req, res, next) {

    const body = req.body;

    Task.findOneAndUpdate({ _id: req.params.task_id, authorId: res.locals.authUserId },
        {
            moduleId: body.moduleId,
            ufId: body.ufId,
            ruleId: body.ruleId,
            name: body.name,
            grade: body.grade,
            done: body.done,
            description: body.description,
            dueDate: body.dueDate
        }, { new: true },

        function (err, doc) {

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
        }
    );
}

exports.remove = async function (req, res, next) {
    Task.findOneAndDelete({ _id: req.params.task_id, authorId: res.locals.authUserId }, function (err, doc) {
        if (err || !doc) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                error: ResponseMessage.DATABASE_ERROR,
                path: req.originalUrl,
                method: req.method,
            });
        }

        return res.status(HttpStatusCode.OK).send({
            message: HttpStatusMessage.OK,
            path: req.originalUrl,
            method: req.method,
        });
    });
}

exports.get = async function (req, res, next) {
    Task.findOne({ _id: req.params.task_id, authorId: res.locals.authUserId }, function (err, doc) {
        if (err || !doc) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                error: ResponseMessage.DATABASE_ERROR,
                path: req.originalUrl,
                method: req.method,
            });
        }

        return res.status(HttpStatusCode.OK).send({
            message: HttpStatusMessage.OK,
            path: req.originalUrl,
            method: req.method,
            body: doc
        });
    });
}