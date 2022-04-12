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
        request.register('/register', hooks.register, function (res) {
            expect(res.status).to.equal(201);
            done();
        })
    });

    it('[2]- Invalid Schema', function (done) {
        request.register('/register', {}, function (res) {
            expect(res.status).to.equal(406);
            done();
        })
    });

    it('[3]- Invalid Password Pattern', function (done) {
        request.register('/register', {
            firstName: hooks.register.firstName,
            lastName: hooks.register.lastName,
            email: hooks.register.email,
            password: "abcdef1"
        }, function (res) {
            expect(res.status).to.equal(406);
            done();
        })
    });

    it('[4]- Invalid Email Pattern', function (done) {
        request.register('/register', {
            firstName: hooks.register.firstName,
            lastName: hooks.register.lastName,
            email: 'abcdef',
            password: hooks.register.password
        }, function (res) {
            expect(res.status).to.equal(406);
            done();
        })
    });

    it('[4]- Invalid First Name Pattern', function (done) {
        request.register('/register', {
            firstName: "abc123",
            lastName: hooks.register.lastName,
            email: hooks.register.email,
            password: hooks.register.password
        }, function (res) {
            expect(res.status).to.equal(406);
            done();
        })
    });

    it('[5]- Invalid Last Name Pattern', function (done) {
        request.register('/register', {
            firstName: hooks.register.firstName,
            lastName: "abc123",
            email: hooks.register.email,
            password: hooks.register.password
        }, function (res) {
            expect(res.status).to.equal(406);
            done();
        })
    });
});