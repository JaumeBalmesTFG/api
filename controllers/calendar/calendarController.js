// Model
const Module = require('../../models/module/Module');
const Task = require('../../models/task/Task');
const Truancy = require('../../models/truancy/Truancy');

// Status Messages
const {
    HttpStatusCode,
    HttpStatusMessage,
    ResponseMessage
} = require('../../config/status-codes');


// Get Calendar
exports.get = async function (req, res) {

    async function getTasks() {

        return new Promise((resolve, reject) => {

            Task.find({ authorId: res.locals.authUserId, archived: false }, (err, doc) => {

                if (err) {

                    reject(err);

                    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                        message: ResponseMessage.DATABASE_ERROR,
                        path: req.originalUrl,
                        method: req.method
                    });
                }

                resolve(doc);

            }).lean();

        });

    }

    async function getTruancies() {

        return new Promise((resolve, reject) => {

            Truancy.find({ authorId: res.locals.authUserId, archived: false }, (err, doc) => {

                if (err) {

                    reject(err);

                    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                        message: ResponseMessage.DATABASE_ERROR,
                        path: req.originalUrl,
                        method: req.method
                    });
                }

                resolve(doc);

            }).lean();

        });


    }

    async function getModule(id) {

        return new Promise((resolve, reject) => {

            Module.findById(id, function (err, doc) {

                if (err) {

                    reject(err);

                    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                        message: ResponseMessage.DATABASE_ERROR,
                        path: req.originalUrl,
                        method: req.method
                    });

                }

                resolve(doc);

            }).lean();

        });

    }

    let allTasks = [];
    let allTruancies = [];
    let calendarData = [];

    await getTasks().then( function (tasks) {

        for (let j = 0; j < tasks.length; j++) {
            allTasks.push(tasks[j]);
        }

    });

    await getTruancies().then( function (truancies) {

        for (let j = 0; j < truancies.length; j++) {
            allTruancies.push(truancies[j]);
        }

    });
    if (allTasks.length > 0) {

        for (let i = 0; i < allTasks.length; i++) {

            let task = allTasks[i];
            let module = await getModule(task.moduleId);

            const data = {
                elementName: task.name,
                title: task.name,
                elementType: "task",

                moduleId: task.moduleId,
                ufId: task.ufId,
                ruleId: task.ruleId,
                elementId: task._id,

                backgroundColor: module.color,
                textColor: '#FFFFFF',
                borderColor: module.color,
                date: task.dueDate,
                allDay: true,
            }

            calendarData.push(data);

        }

    }

    if (allTruancies.length > 0) {

        for (let i = 0; i < allTruancies.length; i++) {

            let truancy = allTruancies[i];
            let module = await getModule(truancy.moduleId);

            const data = {
                elementName: "Truancy",
                title: "Truancy",
                elementType: "truancy",

                moduleId: truancy.moduleId,
                ufId: truancy.ufId,
                elementId: truancy._id,

                backgroundColor: module.color,
                textColor: '#FFFFFF',
                borderColor: module.color,
                allDay: true,
                date: truancy.date,
                hours: truancy.hours
            }

            calendarData.push(data);
        }

    }

    return res.status(HttpStatusCode.OK).send({
        message: HttpStatusMessage.OK,
        path: req.originalUrl,
        method: req.method,
        body: calendarData,
    });

}