// Register Test
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

// User Model
const User = require('../models/auth/User');

// Custom Requests
const request = require('./requests/functions');
const hooks = require('./requests/hooks');

// Middleware
chai.use(chaiHttp);

// Register Unit Test
'use strict';
describe('/Login', function () {

    this.beforeAll(function () {
        request.auth('/register', hooks.user).then();
    });

    // Test Cases
    it('[1]- Login', function (done) {
        request.auth('/login', {
            email: hooks.user.email,
            password: hooks.user.password
        }).then(function(res){
            expect(res.status).to.equal(202);
            done();
        }).catch(function(err){ done(err); });
    });

    it('[2]- Empty Schema', function (done) {
        request.auth('/login', {}).then(function(res){
            expect(res.status).to.equal(406);
            done();
        }).catch(function(err){ done(err); });
    });

    it('[3]- Invalid Login', function (done) {
        request.auth('/login', {
            email: '123@123.com',
            password: hooks.user.password
        }).then(function(res){
            expect(res.status).to.equal(409);
            done();
        }).catch(function(err){ done(err); });
    });

    it('[4]- Invalid Fields', function (done) {
        request.auth('/login', {
            firstName: hooks.user.firstName,
            email: hooks.user.email,
            password: hooks.user.password,
        }).then(function(res){
            expect(res.status).to.equal(406);
            done();
        }).catch(function(err){ done(err); });
    });

    this.afterAll(async function(){
        await User.deleteMany({});
    });
});