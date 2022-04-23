// Register Test
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

// User Model
const User = require('../models/auth/User');
const Module = require('../models/module/Module');
const Uf = require('../models/uf/Uf');

// Custom Requests
const request = require('./requests/functions');

// Hooks
const hooks = require('./requests/hooks');

// Middleware
chai.use(chaiHttp);

// Register Unit Test
describe('/Uf', function () {

    // Data
    let token;
    let uf_id;
    let uf = {
        moduleId: null,
        ...hooks.uf
    }

    this.beforeAll(async function (done) {
        await request.auth('/register', hooks.user).then(function (res) {
            token = res.body.token;
        });

        await request.post('/module', token, hooks.module).then(function (res) {
            uf.moduleId = res.body.body._id;
        });
    });

    // Test Cases
    it('[1]- Create UF', function (done) {
        request.post('/uf/create', token, uf).then(function (res) {
            expect(res.status).to.equal(201);
            uf_id = res.body.body._id;
            done();
        }).catch(function (err) { done(err); });
    });

    it('[2]- Create UF Unauthorized', function (done) {
        request.post('/uf/create', {}, uf).then(function (res) {
            expect(res.status).to.equal(401);
            done();
        }).catch(function (err) { done(err); });
    });

    it('[3]- Invalid UF Schema ', function (done) {
        request.post('/uf/create', token, {}).then(function (res) {
            expect(res.status).to.equal(406);
            done();
        }).catch(function (err) { done(err); });
    });

    it('[4]- Update UF', function (done) {
        uf.name = "Edited"
        request.edit(`/uf/${uf_id}/edit`, token, uf).then(function (res) {
            expect(res.body.body.name).to.equal("Edited");
            expect(res.status).to.equal(200);
            done();
        }).catch(function (err) { done(err); });
    });

    it('[5]- Get UF', function (done) {
        request.get(`/uf/${uf_id}`, token, uf).then(function (res) {
            expect(res.status).to.equal(200);
            done();
        }).catch(function (err) { done(err); });
    });

    it('[6]- Get Invalid UF', function (done) {
        request.get(`/uf/${uf_id + "0"}`, token, uf).then(function (res) {
            expect(res.status).to.equal(500);
            done();
        }).catch(function (err) { done(err); });
    });

    it('[7]- Create UF - Invalid Module', function (done) {
        uf.moduleId = "62575d1ddc2246861a6998e9";
        request.post('/uf/create', token, uf).then(function (res) {
            expect(res.status).to.equal(500);
            done();
        }).catch(function (err) { done(err); });
    });

    this.afterAll(async function(){
        await User.deleteMany({});
        await Module.deleteMany({});
        await Uf.deleteMany({});
    });
});