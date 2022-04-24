// Register Test
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;


// User Model
const User = require('../models/auth/User');

// Custom Requests
const hooks = require('./requests/hooks');

// connection
const db = require('../connection');
const app = require('../server');
const { default: mongoose } = require('mongoose');
const { URI, URI_TEST } = require('../config/config');


chai.use(chaiHttp);

describe('POST /register', () => {
    it('it should GET all the books', (done) => {
        chai.request(app)
            .post('/register')
            .send(hooks.user)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                done();
            });
    });
});