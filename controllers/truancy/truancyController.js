// Truancy Model
const Truancy = require('../../models/truancy/Truancy');

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

// Create Truancy
exports.create = async function (req, res, next) {

    const { moduleId, ufId, date, reason, hours } = req.body;

    const newTruancy = new Truancy({
        authorId: res.locals.authUserId,
        moduleId: moduleId,
        ufId: ufId,
        date: date,
        reason: reason,
        hours: hours
    });

    await newTruancy.save(function (err, doc) {

        return res.status(HttpStatusCode.CREATED).send({
            message: 'TRUANCY_' + ResponseMessage.CREATED,
            path: req.originalUrl,
            method: req.method,
            body: doc,
        });
    });
}

// Get Truancy
exports.get = async function (req, res, next) {

    if(!checkPathObjectId(req.params.truancy_id)){
        return res.status(HttpStatusCode.BAD_REQUEST).send({
            message: HttpStatusMessage.BAD_REQUEST,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    Truancy.findOne({ _id: req.params.truancy_id }, function (err, doc) {
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

// Update Truancy
exports.update = async function (req, res, next) {

    if(!checkPathObjectId(req.params.truancy_id)){
        return res.status(HttpStatusCode.NOT_ACCEPTABLE).send({
            message: HttpStatusMessage.NOT_ACCEPTABLE,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    const { moduleId, ufId, date, reason, hours } = req.body;

    const doc = await Truancy.findOne({ _id: req.params.truancy_id});

    if(!doc){
        return res.status(HttpStatusCode.NOT_FOUND).send({
            message: HttpStatusMessage.NOT_FOUND,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    doc.moduleId = moduleId;
    doc.ufId = ufId;
    doc.date = date;
    doc.reason = reason;
    doc.hours = hours;

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

// Delete Truancy
exports.remove = async function (req, res, next) {

    if(!checkPathObjectId(req.params.truancy_id)){
        return res.status(HttpStatusCode.BAD_REQUEST).send({
            message: HttpStatusMessage.BAD_REQUEST,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    const match = await Truancy.findOne({  _id: req.params.truancy_id });

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
