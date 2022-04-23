// Auth Test
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

// Auth Unit Test
describe('/Auth', function () {

    this.beforeAll(async function () {
        await User.deleteMany({});
        request.auth('/register', hooks.user).then();
    });

    // Test Cases
    it('[1]- Auth Login', function (done) {
        request.auth('/auth', {
            email: hooks.user.email,
        }).then(function(res){
            expect(res.status).to.equal(200);
            expect(res.body.body.action).to.equal("login")
            done();
        }).catch(function(err){ done(err); });
    });

    it('[2]- Auth Register', function (done) {
        request.auth('/auth', {
            email: "inventedemail@klendar.com"
        }).then(function(res){
            expect(res.status).to.equal(200);
            expect(res.body.body.action).to.equal("register")
            done();
        }).catch(function(err){ done(err); });
    });

    it('[3]- Empty Schema', function (done) {
        request.auth('/auth', {}).then(function(res){
            expect(res.status).to.equal(406);
            done();
        }).catch(function(err){ done(err); });
    });

});