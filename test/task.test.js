// Register Test
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

// User Model
const User = require('../models/auth/User');
const Module = require('../models/module/Module');
const Task = require('../models/task/Task');
const Uf = require('../models/uf/Uf');

// Custom Requests
const request = require('./requests/functions');

// Hooks
const hooks = require('./requests/hooks');

// Middleware
chai.use(chaiHttp);

// Register Unit Test
describe('/Task', function () {

    // Data
    let token;
    let taskId;
    let uf = { moduleId: null, ...hooks.uf };
    let task = { ufId: null, ruleId: null,  ...hooks.task };
    let rule = {
        ufId: null,
        ...hooks.rule
    };

    this.beforeAll(async function () {
        await request.auth('/register', hooks.user).then(function (res) {
            token = res.body.token;
        });

        await request.post('/module', token, hooks.module).then(function (res) {
            uf.moduleId = res.body.body._id;
        });

        await request.post('/uf/create', token, uf).then(function(res){
            task.ufId = res.body.body._id;
            rule.ufId = res.body.body._id;
        });

        await request.post('/rule/create', token, rule).then(function(res){
            task.ruleId = res.body.body._id;
        });
    });

    // Test Cases
    it('[1]- Create Task', function (done) {
        request.post('/task/create', token, task).then(function (res) {
            expect(res.status).to.equal(201);
            taskId = res.body.body._id;
            done();
        }).catch(function (err) { done(err);  });
    });

    it('[2]- Edit Task', function (done) {
        task.name = "Edited";
        request.edit(`/task/${taskId}/edit`, token, task).then(function (res) {
            expect(res.body.body.name).to.equal("Edited");
            expect(res.status).to.equal(200);

            done();
        }).catch(function (err) { done(err); });
    });

    it('[3]- Get Task', function (done) {
        request.get(`/task/${taskId}`, token, {}).then(function (res) {
            expect(res.status).to.equal(200);
            done();
        }).catch(function (err) { done(err); });
    });

    it('[4]- Create Invalid Schema Task', function (done) {
        request.post('/task/create', token, {}).then(function (res) {
            expect(res.status).to.equal(406);
            done();
        }).catch(function (err) { done(err); });
    });

    it('[5]- Update Invalid Schema Task', function (done) {
        request.edit(`/task/${taskId}/edit`, token, {}).then(function (res) {
            expect(res.status).to.equal(406);
            done();
        }).catch(function (err) { done(err); });
    });

    it('[6]- Create Invalid UfId Task', function (done) {
        let taskTemp = {
            ufId: "6259e3e95f71a80819cb020b",
            ruleId: task.rule,
            name: task.name,
            description: task.description,
            grade: task.grade,
            dueDate: task.dueDate
        };

        request.post(`/task/${taskId}`, token, taskTemp).then(function (res) {
            expect(res.status).to.equal(404);
            done();
        }).catch(function (err) { done(err); });
    });

    it('[6]- Delete Task', function (done) {
        request.delete(`/task/${taskId}/delete`, token, {}).then(function (res) {
            expect(res.status).to.equal(200);
            done();
        }).catch(function (err) { done(err); });
    });

    it('[7]- Delete Non Existent Task', function (done) {
        request.delete(`/task/${taskId}/delete`, token, {}).then(function (res) {
            expect(res.status).to.equal(500);
            done();
        }).catch(function (err) { done(err); });
    });

    this.afterAll(async function(){
        await User.deleteMany({});
        await Module.deleteMany({});
        await Uf.deleteMany({});
        await Task.deleteMany({});
    });
});