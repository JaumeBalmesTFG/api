// Register Test
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

// User Model
const User = require('../models/auth/User');
const Module = require('../models/module/Module');
const Rule = require('../models/rule/Rule');
const Uf = require('../models/uf/Uf');

// Custom Requests
const request = require('./requests/functions');

// Hooks
const hooks = require('./requests/hooks');

// Middleware
chai.use(chaiHttp);

// Register Unit Test
describe('/Rule', function () {

    // Data
    let token;
    let moduleId;
    let ruleId;
    let rule = {
        ufId: null,
        ...hooks.rule
    }

    this.beforeAll(async function () {
        await User.deleteMany({});
        await Module.deleteMany({});
        await Uf.deleteMany({});
        await Rule.deleteMany({});

        await request.auth('/register', hooks.user).then(function (res) {
            token = res.body.token;
        });

        await request.post('/module', token, hooks.module).then(function (res) {
            moduleId = res.body.body._id;
        });

        await request.post('/uf/create', token, {
            moduleId: moduleId,
            ...hooks.uf
        }).then(function (res) {
            rule.ufId = res.body.body._id;
        });
    });

    // Test Cases
    it('[1]- Create Rule', function (done) {
        request.post('/rule/create', token, rule).then(function (res) {
            expect(res.status).to.equal(201);
            ruleId = res.body.body._id;
            done();
        }).catch(function (err) { done(err); });
    });

    it('[2]- Create Rule Unauthorized', function (done) {
        request.post('/rule/create', {}, rule).then(function (res) {
            expect(res.status).to.equal(401);
            done();
        }).catch(function (err) { done(err); });
    });

    it('[3]- Update Rule', function (done) {
        rule.title = "Edited";
        request.edit(`/rule/${ruleId}/edit`, token, rule).then(function (res) {
            expect(res.body.body.title).to.equal("Edited");
            expect(res.status).to.equal(200);
            done();
        }).catch(function (err) { done(err); });
    });

    it('[4]- Get Rule', function (done) {
        request.get(`/rule/${ruleId}`, token, {}).then(function (res) {
            expect(res.status).to.equal(200);
            done();
        }).catch(function (err) { done(err); });
    });

    it('[5]- Get Rules from UF', function (done) {
        request.get(`/rule/uf/${rule.ufId}`, token, {}).then(function (res) {
            expect(res.status).to.equal(200);
            done();
        }).catch(function (err) { done(err); });
    });

    it('[5]- Update Invalid Schema Rule', function (done) {
        request.edit(`/rule/${ruleId}/edit`, token, {}).then(function (res) {
            expect(res.status).to.equal(406);
            done();
        }).catch(function (err) { done(err); });
    });

    it('[6]- Delete Rule', function (done) {
        request.delete(`/rule/${ruleId}/delete`, token, {}).then(function (res) {
            expect(res.status).to.equal(200);
            done();
        }).catch(function (err) { done(err); });
    });

    it('[7]- Get Rule After Delete', function (done) {
        request.delete(`/rule/${ruleId}/delete`, token, {}).then(function (res) {
            expect(res.status).to.equal(404);
            done();
        }).catch(function (err) { done(err); });
    });
});