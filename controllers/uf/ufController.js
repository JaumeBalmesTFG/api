// Uf Model
const Uf = require('../../models/uf/Uf');
const Rule = require('../../models/rule/Rule');
const Truancy = require('../../models/truancy/Truancy');

// Status Messages
const {
    HttpStatusCode,
    ResponseMessage, HttpStatusMessage
} = require('../../config/status-codes');

// Create Uf
exports.create = async function (req, res, next) {

    const { moduleId, name, hours, truancy_percentage } = req.body;

    const match = await Uf.findOne({
        moduleId: moduleId,
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

    const newUf = new Uf({
        moduleId: moduleId,
        name: name,
        hours: hours,
        truancy_percentage: truancy_percentage,
    });

    await newUf.save(function (err, doc) {
        if (err) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                error: ResponseMessage.DATABASE_ERROR,
                path: req.originalUrl,
                method: req.method,
                body: req.body
            });
        }

        return res.status(HttpStatusCode.CREATED).send({
            message: 'UF_' + ResponseMessage.CREATED,
            path: req.originalUrl,
            method: req.method,
            body: doc,
        });
    });
}

// Get one Uf
exports.get = async function (req, res, next) {
    Uf.findOne({ _id: req.params.uf_id }, function (err, doc) {
        if (err) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                message: ResponseMessage.DATABASE_ERROR,
                path: req.originalUrl,
                method: req.method,
                body: doc,
            });
        }

        Rule.find({ uf_id: req.params.uf_id }, function (err, rules) {
            if (err) {
                return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                    message: ResponseMessage.DATABASE_ERROR,
                    path: req.originalUrl,
                    method: req.method,
                    body: rules,
                });
            }
            Truancy.find({ uf_id: req.params.uf_id }, function (err, truancies) {

                if (err) {
                    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                        message: ResponseMessage.DATABASE_ERROR,
                        path: req.originalUrl,
                        method: req.method,
                        body: truancies,
                    });
                }

                let totalHoursLeft;
                let truanciesMade = 0;
                for (let i = 0; i < truancies.length; i++) {
                    truanciesMade += truancies[i].hours;
                }

                totalHoursLeft = ((parseInt(doc.hours) * parseInt(doc.truancy_percentage)) / 100) - truanciesMade;
                doc.total_hours_left = totalHoursLeft;
                let result = {doc, rules};
                return res.status(HttpStatusCode.OK).json({
                    message: HttpStatusMessage.OK,
                    path: req.originalUrl,
                    method: req.method,
                    body: result,
                });
            });

        });
    });
}

// Update Uf
exports.update = async function (req, res, next) {

    const { moduleId, name, hours, truancy_percentage } = req.body;

    const doc = await Uf.findOne({ _id: req.params.uf_id, moduleId: moduleId});

    if(!doc){
        return res.status(HttpStatusCode.NOT_FOUND).send({
            message: HttpStatusMessage.NOT_FOUND,
            path: req.originalUrl,
            method: req.method,
            body: req.body
        });
    }

    doc.name = name;
    doc.hours = hours;
    doc.truancy_percentage = truancy_percentage;

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
