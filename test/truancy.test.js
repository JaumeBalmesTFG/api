// Register Test
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

// User Model
const User = require('../models/auth/User');
const Module = require('../models/module/Module');
const Truancy = require('../models/truancy/Truancy');
const Uf = require('../models/uf/Uf');

// Custom Requests
const request = require('./requests/functions');

// Hooks
const hooks = require('./requests/hooks');

// Middleware
chai.use(chaiHttp);

// Register Unit Test
describe('/Truancy', function () {

    // Data
    let token;
    let moduleId;
    let truancyId;
    let truancy = {
        ufId: null,
        ...hooks.truancy
    }

    this.beforeAll(async function () {
        await User.deleteMany({});
        await Module.deleteMany({});
        await Uf.deleteMany({});
        await Truancy.deleteMany({});

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
            truancy.ufId = res.body.body._id;
        });
    });

    // Test Cases
    it('[1]- Create Truancy', function (done) {
        request.post('/truancy/create', token, truancy).then(function (res) {
            expect(res.status).to.equal(201);
            truancyId = res.body.body._id;
            done();
        }).catch(function (err) { done(err); });
    });

    it('[2]- Create Truancy Unauthorized', function (done) {
        request.post('/truancy/create', {}, truancy).then(function (res) {
            expect(res.status).to.equal(401);
            done();
        }).catch(function (err) { done(err); });
    });

    it('[3]- Update Truancy', function (done) {
        truancy.reason = "Edited";
        request.edit(`/truancy/${truancyId}/edit`, token, truancy).then(function (res) {
            expect(res.body.body.reason).to.equal("Edited");
            expect(res.status).to.equal(200);
            done();
        }).catch(function (err) { done(err); });
    });

    it('[4]- Get Truancy', function (done) {
        truancy.reason = "Edited";
        request.get(`/truancy/${truancyId}`, token, {}).then(function (res) {
            expect(res.status).to.equal(200);
            done();
        }).catch(function (err) { done(err); });
    });

    it('[5]- Update Invalid Schema Truancy', function (done) {
        request.edit(`/truancy/${truancyId}/edit`, token, {}).then(function (res) {
            expect(res.status).to.equal(406);
            done();
        }).catch(function (err) { done(err); });
    });

    it('[6]- Delete Truancy', function (done) {
        request.delete(`/truancy/${truancyId}/delete`, token, {}).then(function (res) {
            expect(res.status).to.equal(200);
            done();
        }).catch(function (err) { done(err); });
    });

    it('[7]- Get Truancy After Delete', function (done) {
        request.get(`/truancy/${truancyId}`, token, {}).then(function (res) {
            expect(res.status).to.equal(200);
            done();
        }).catch(function (err) { done(err); });
    });
});