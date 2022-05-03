// Module Model
const Module = require('../../models/module/Module');
const Uf = require('../../models/uf/Uf');

const Task = require('../../models/task/Task');
const Rule = require('../../models/rule/Rule');

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

const Truancy = require('../../models/truancy/Truancy');
const {uf} = require("../../test/requests/hooks");

// Create Module
exports.create = async function (req, res, next) {

    const { name, color } = req.body;

    const match = await Module.findOne({
        authorId: res.locals.authUserId,
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
        authorId: res.locals.authUserId,
        name: name,
        color: color,
        archived: false
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

    if (!checkPathObjectId(req.params.module_id)) {
        return res.status(HttpStatusCode.BAD_REQUEST).send({
            message: HttpStatusMessage.BAD_REQUEST,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    Module.findOne({ _id: req.params.module_id, authorId: res.locals.authUserId }, function (err, doc) {
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

exports.getAllUfsFromModules = async function (req, res, next) {
    let modules;

    async function getModules() {
        return Module.find({ authorId: res.locals.authUserId, archived: false }).lean();
    }

    async function getUfs(module){
        return Uf.find({ moduleId: module._id, archived: false }).lean();
    }

    await getModules().then( function (foundModules) {
        modules = foundModules;
    }).catch(function(err){
        if (err) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                message: ResponseMessage.DATABASE_ERROR,
                path: req.originalUrl,
                method: req.method,
                body: modules,
            });
        }
    });

    if (modules.length > 0) {
        for (let i = 0; i < modules.length; i++) {
            await getUfs(modules[i]).then( function (ufs) {
                modules[i]['ufs'] = ufs;
            }).catch(function (err) {
                if (err) {
                    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                        message: ResponseMessage.DATABASE_ERROR,
                        path: req.originalUrl,
                        method: req.method,
                        body: modules,
                    });
                }
            });
        }

        return res.status(HttpStatusCode.OK).send({
            message: HttpStatusMessage.OK,
            path: req.originalUrl,
            method: req.method,
            body: modules,
        });
    }

    return res.status(HttpStatusCode.NOT_FOUND).send({
        message: HttpStatusMessage.NOT_FOUND,
        path: req.originalUrl,
        method: req.method,
        body: modules,
    });
}

// Get All Archived Modules
exports.getAllArchived = async function (req, res, next) {
    Module.find({ authorId: res.locals.authUserId, archived: true }, function (err, doc) {
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

    if (!checkPathObjectId(req.params.module_id)) {
        return res.status(HttpStatusCode.BAD_REQUEST).send({
            message: HttpStatusMessage.BAD_REQUEST,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    const { name, color } = req.body;

    const match = await Module.findOne({ _id: req.params.module_id, authorId: res.locals.authUserId, name: name });

    if (match) {
        return res.status(HttpStatusCode.CONFLICT).send({
            message: ResponseMessage.ALREADY_EXISTS,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    const doc = await Module.findOne({ _id: req.params.module_id, authorId: res.locals.authUserId });

    if (!doc) {
        return res.status(HttpStatusCode.NOT_FOUND).send({
            message: HttpStatusMessage.NOT_FOUND,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    doc.name = name;
    doc.color = color;

    await doc.save(function (err, obj) {
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

    if (!checkPathObjectId(req.params.module_id)) {
        return res.status(HttpStatusCode.BAD_REQUEST).send({
            message: HttpStatusMessage.BAD_REQUEST,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    const match = await Module.findOne({  _id: req.params.module_id, authorId: res.locals.authUserId });


    if (!match) {
        return res.status(HttpStatusCode.NOT_FOUND).send({
            message: HttpStatusMessage.NOT_FOUND,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    match.archived = req.body.archived;

    match.save(function(err, doc){
        if (err) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                error: ResponseMessage.DATABASE_ERROR,
                path: req.originalUrl,
                method: req.method,
                body: req.body
            });
        }

        Uf.updateMany({ moduleId: match._id }, {archived: req.body.archived}, function(err, doc){
            if (err) {
                return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                    error: ResponseMessage.DATABASE_ERROR,
                    path: req.originalUrl,
                    method: req.method,
                    body: req.body
                });
            }
        });

        return res.status(HttpStatusCode.OK).send({
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    });
};

exports.getAll = async function (req, res, next) {

    // Get modules
    var modules = await Module.find({ authorId: res.locals.authUserId, archived: false }, { _id: 1, color: 1, name: 1 }).lean();

    // Save Modules Promises
    var ufPromises = modules.map(async function (m, i) {
        m.ufs = await Uf.find({ moduleId: m._id, authorId: res.locals.authUserId }, { createdAt: 0, updatedAt: 0, __v: 0 }).lean();

        var taskPromises = m.ufs.map(async function (uf, i) {

            uf.truancies = await Truancy.find({ ufId: uf._id, authorId: res.locals.authUserId }, { hours: 1 });

            uf.tasks = await Task.find({ ufId: uf._id, authorId: res.locals.authUserId }, { ruleId: 1, grade: 1, name: 1 }).lean();

            var rulePromises = uf.tasks.map(async function (task, i) {
                task.rule = await Rule.findById(task.ruleId, { percentage: 1, title: 1 }).lean();
                return task;
            });

            uf.tasks = await Promise.all(rulePromises).then(function (res) { return res; });
            return uf;
        });

        m.ufs = await Promise.all(taskPromises).then(function (res) { return res; });

        return m;
    });

    // Get Promises
    modules = await Promise.all(ufPromises).then(function (res) { return res; });

    // Calc grades
    modules.forEach(function (m) {

        m.globalModuleGrade = 0;

        m.ufs.forEach(function (uf) {
            var grades = {};
            var calcGrade = 0;
            var calcTruancy = 0;

            uf.tasks.forEach(function (task) {
                grades[task.rule.title] = { percentage: task.rule.percentage, grade: 0 };
            });

            uf.tasks.forEach(function (task) {
                grades[task.rule.title].grade += parseFloat(task.grade);
            });

            // Calc uf global grade
            Object.keys(grades).forEach(function(key) {
                calcGrade += ((grades[key].percentage / 100) * grades[key].grade);
            });

            uf.globalUfGrade = calcGrade.toFixed(2);

            m.globalModuleGrade += parseFloat(uf.globalUfGrade);

            // Calc Truancies
            uf.truancies.forEach(function(trn){
                calcTruancy += trn.hours;
            });

            uf.totalTruancies = (100 / uf.hours) * calcTruancy;

            return uf.globalUfGrade;
        });

        m.globalModuleGrade = m.globalModuleGrade / m.ufs.length;

    });

    return res.send(modules);
};