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
describe('/Login', function () {

    this.beforeAll(async function () {
        await User.deleteMany({});
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
        });
    });

    it('[2]- Empty Schema', function (done) {
        request.auth('/login', {}).then(function(res){
            expect(res.status).to.equal(406);
            done();
        });
    });

    it('[3]- Invalid Login', function (done) {
        request.auth('/login', {
            email: '123@123.com',
            password: hooks.user.password
        }).then(function(res){
            expect(res.status).to.equal(409);
            done();
        })
    });

    it('[4]- Invalid Fields', function (done) {
        request.auth('/login', {
            firstName: hooks.user.firstName,
            email: hooks.user.email,
            password: hooks.user.password,
        }).then(function(res){
            expect(res.status).to.equal(406);
            done();
        });
    });
});