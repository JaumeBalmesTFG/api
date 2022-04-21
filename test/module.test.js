// Register Test
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

// User Model
const User = require('../models/auth/User');
const Module = require('../models/module/Module');

// Custom Requests
const request = require('./requests/functions');

// Hooks
const hooks = require('./requests/hooks');

// Middleware
chai.use(chaiHttp);

// Register Unit Test
describe('/Module', function () {
    
    // Data
    let module_id;
    let token;

    this.beforeAll(async function () {
        await User.deleteMany({});
        await Module.deleteMany({});
        await request.auth('/register', hooks.user).then(function(res){
            token = res.body.token;
        });
    });
    
    // Test Cases
    it('[1]- Create Module', function (done) {
        request.post('/module', token, hooks.module).then(function(res){
            expect(res.status).to.equal(201);
            module_id = res.body.body._id;
            done();
        
        }).catch(function(err){ done(err); });
    });

    it('[2]- Create Module Unauthorized', function (done) {
        request.post('/module', token + "00", hooks.module).then(function(res){
            expect(res.status).to.equal(401);
            done();
        
        }).catch(function(err){ done(err); });
    });

    it('[3]- Invalid Schema', function (done) {
        request.post('/module', token, {}).then(function(res){
            expect(res.status).to.equal(406);
            done();
        
        }).catch(function(err){ done(err); });
    });

    it('[4]- Archive Module', function (done) {
        request.edit(`/module/${module_id}/archive`, token, { archived: true }).then(function(res){
            console.log("-------------");
            console.log(res.body.body);
            expect(res.body.body.archived).to.equal(true);
            expect(res.status).to.equal(200);
            done();
        
        }).catch(function(err){ done(err); });
    });

    it('[5]- Get Module', function(done){
        request.get(`/module/${module_id}`, token).then(function(res){
            expect(res.status).to.equal(200);
            done();
        }).catch(function(err){ done(err); });
    });

    it('[6]- Update Module', function(done){
        request.edit(`/module/${module_id}`, token, {
            name: "Edited",
            color: hooks.module.color
        }).then(function(res){
            expect(res.body.body.name).to.equal("Edited");
            expect(res.status).to.equal(200);
            done();
        }).catch(function(err){ done(err); });
    });

    it('[7]- Invalid Update Module', function(done){
        request.edit(`/module/${module_id}`, token, {
            name: "",
            color: hooks.module.color
        }).then(function(res){
            expect(res.status).to.equal(406);
            done();
        }).catch(function(err){ done(err); });
    });
});