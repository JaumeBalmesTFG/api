// Module Model
const Module = require('../../models/module/Module');
const Uf = require('../../models/uf/Uf');
const Task = require('../../models/task/Task');
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

// Get Calendar
exports.get = async function (req, res, next) {

    let modules;

    async function getModules() {
        return Module.find({authorId: res.locals.authUserId, archived: false}).lean();
    }

    async function getUfs(module) {
        return Uf.find({moduleId: module._id, archived: false}).lean();
    }

    async function getTasks(uf) {
        return Task.find({
            ufId: uf._id,
            archived: false,
            dueDate: {$gt: req.params.dateStart, $lt: req.params.dateEnd}
        }).lean();
    }

    async function getTruancies(uf) {
        return Truancy.find({
            ufId: uf._id,
            archived: false,
            date: {$gt: req.params.dateStart, $lt: req.params.dateEnd}
        }).lean();
    }

    await getModules().then(function (foundModules) {
        modules = foundModules;
    }).catch(function (err) {
        if (err) {}
    });

    let allUfs = [];
    if (modules.length > 0) {
        for (let i = 0; i < modules.length; i++) {
            await getUfs(modules[i]).then(function (ufs) {
                modules[i]['ufs'] = ufs;
                allUfs[i] = ufs;
            }).catch(function (err) {
            });
        }

        let allTasks = [];
        let allTruancies = [];


        if (allUfs.length > 0) {
            for (let i = 0; i < allUfs.length; i++) {
                await getTasks(allUfs[i]).then( function (tasks) {
                    allTasks[i] = tasks;
                }).catch(function (err) {
                    if (err) {}
                });
                await getTruancies(allUfs[i]).then( function (truancies) {
                    allTruancies[i] = truancies;
                }).catch(function (err) {
                    if (err) {}
                });
            }




            let calendarData = {};
            let auxCounter;

            if (allTasks.length > 0 || allTruancies.length > 0) {
                for (let i = 0; i < modules.length; i++) {
                    auxCounter = 0;
                    for (let j = 0; j < allUfs.length; j++) {
                        if (modules[i]._id === allUfs[i][j].moduleId) {
                            return res.send("HOLA");
                            for (let k = 0; k < allTasks.length; k++) {
                                calendarData[j].ufName = allUfs[j].name;
                                calendarData[j].backgroundColor = modules[i].color;
                                calendarData[j].elementName = allTasks[k].name;
                                calendarData[j].elementId = allTasks[k]._id;
                                calendarData[j].date = allTasks[k].dueDate;
                                calendarData[j].elementType = "task";
                                auxCounter++;
                            }
                            for (let l = 0; l < allTruancies.length; l++) {
                                calendarData[l + auxCounter].ufName = allUfs[j].name;
                                calendarData[l + auxCounter].backgroundColor = modules[i].color;
                                calendarData[l + auxCounter].elementName = allTruancies[l].name;
                                calendarData[l + auxCounter].elementId = allTruancies[l]._id;
                                calendarData[l + auxCounter].date = allTruancies[l].dueDate;
                                calendarData[l + auxCounter].elementType = "truancy";
                                auxCounter++;
                            }
                            return res.status(HttpStatusCode.OK).send({
                                message: HttpStatusMessage.OK,
                                path: req.originalUrl,
                                method: req.method,
                                body: calendarData,
                            });
                        }
                    }
                }
            }
        }
    }

        return res.status(HttpStatusCode.NOT_FOUND).send({
            message: HttpStatusMessage.NOT_FOUND,
            path: req.originalUrl,
            method: req.method,
            body: "HOLA",
        });
}