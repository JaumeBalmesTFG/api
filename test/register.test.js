// Register Test
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

// User Model
const User = require('../models/auth/User');

// Custom Requests
const request = require('./requests/functions');

// Hooks
const hooks = require('./requests/hooks');

// Middleware
chai.use(chaiHttp);

// Register Unit Test
describe('/Register', function () {

    // Before Each Test | Drop Users Table Data
    this.beforeEach(async function () {
        await User.deleteMany({});
    });

    // Test Cases
    it('[1]- Register', function (done) {
        request.auth('/register', hooks.user).then(function(res){
            expect(res.status).to.equal(201);
            done();
        }).catch(function(err){ done(err); });
    });

    it('[2]- Invalid Schema', function (done) {
        request.auth('/register', {}).then(function(res){
            expect(res.status).to.equal(406);
            done();
        }).catch(function(err){ done(err); });
    });

    it('[3]- Invalid Password Pattern', function (done) {
        request.auth('/register', {
            firstName: hooks.user.firstName,
            lastName: hooks.user.lastName,
            email: hooks.user.email,
            password: "abcdef1"
        }).then(function(res){
            expect(res.status).to.equal(406);
            done();
        }).catch(function(err){ done(err); });
    });

    it('[4]- Invalid Email Pattern', function (done) {
        request.auth('/register', {
            firstName: hooks.user.firstName,
            lastName: hooks.user.lastName,
            email: 'abcdef',
            password: hooks.user.password
        }).then(function(res){
            expect(res.status).to.equal(406);
            done();
        }).catch(function(err){ done(err); });
    });

    it('[4]- Invalid First Name Pattern', function (done) {
        request.auth('/register', {
            firstName: "abc123",
            lastName: hooks.user.lastName,
            email: hooks.user.email,
            password: hooks.user.password
        }).then(function(res){
            expect(res.status).to.equal(406);
            done();
        }).catch(function(err){ done(err); });
    });

    it('[5]- Invalid Last Name Pattern', function (done) {
        request.auth('/register', {
            firstName: hooks.user.firstName,
            lastName: "abc123",
            email: hooks.user.email,
            password: hooks.user.password
        }).then(function(res){
            expect(res.status).to.equal(406);
            done();
        }).catch(function(err){ done(err); });
    });
});