// Module Model
const Module = require('../../models/module/Module');

// Status Messages
const {
    HttpStatusCode,
    HttpStatusMessage,
    ResponseMessage
} = require('../../config/status-codes');

// Create Module
exports.create = async function (req, res, next) {

    const { name, color } = req.body;

    const match = await Module.findOne({
        authorId: req.authUserId,
        name: name
    });

    if(match){
        return res.status(HttpStatusCode.CONFLICT).send({
            error: ResponseMessage.ALREADY_EXISTS,
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
            message: 'MODULE ' + ResponseMessage.CREATED,
            path: req.originalUrl,
            method: req.method,
            body: doc,
        }); 
    });
}

// Get All Modules
exports.get = async function (req, res, next) {
    await Module.findOne({ _id: req.params.module_id }, function (err, doc) {
        if (err) {
            return res.send("error on getting the module");
        }

        return res.send(doc);
    });
}

// Update Module
exports.update = async function (req, res, next) {
    await Module.findOneAndUpdate(
        { _id: req.params.module_id },
        { $set: req.body },
        { new: true },

        function (err, doc) {
            if (err) {
                return res.send("error on updating");
            }

            return res.send(doc);
        }
    )
}

// Archive Module
exports.archive = async function (req, res, next) {
    await Module.findOneAndUpdate(
        { _id: req.params.module_id },
        { $set: req.body },
        { new: true },

        function (err, doc) {
            if (err) {
                return res.send("error on updating");
            }

            return res.send(doc);
        }
    )
}
