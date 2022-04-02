// Module Model
const Module = require('../../models/module/Module');

// Status Messages
const {
    HttpStatusCode,
    HttpStatusMessage,
    ResponseMessage
} = require('../../config/status-codes');

exports.create = async function (req, res, next) {

    const { name, color } = req.body;

    const newModule = new Module({
        name: name,
        color: color
    });

    await newModule.save(function (err, doc) {
        if (err) {
            return res.send("error");
        }

        return res.send(doc);
    });
}

exports.get = async function (req, res, next) {
    await Module.findOne({ _id: req.params.module_id }, function (err, doc) {
        if (err) {
            return res.send("error on getting the module");
        }

        return res.send(doc);
    });
}

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
