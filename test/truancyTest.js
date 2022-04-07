// Unit Testing /uf

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../models/auth/User');
const Module = require('../models/module/Module');
const Uf = require('../models/uf/Uf');
const Truancy = require('../models/truancy/Truancy')
const jwt = require('jsonwebtoken');
// Assertion Style
chai.should();
chai.use(chaiHttp);

var token;
var module_id;
var uf_id;
var truancy_id;
var createdTruancyId;

before(function(done) {
    const user = {
        firstName: "username",
        lastName: "lastname",
        email: "userttest@klendar.com",
        password: "TYF5Gf%w"
    }

    const module = {
        name: "Tests Module",
        color: "#00000F"
    }

    chai.request(server)
        .post("/register")
        .send(user)
        .end(function (err, response) {
            token = response.body.token;
            chai.request(server)
                .post("/module")
                .set({ "Authorization": `Bearer ${token}` })
                .send(module)
                .end(function (err, response) {
                    module_id = response.body.body._id;
                    const uf = {
                        moduleId: module_id,
                        name: "Testthisqweufnow",
                        hours: 100,
                        truancy_percentage: 20,
                    }
                    chai.request(server)
                        .post("/uf/create")
                        .set({ "Authorization": `Bearer ${token}` })
                        .send(uf)
                        .end(function (err, response) {
                            uf_id = response.body.body._id;

                            const truancy = {
                                ufId: uf_id,
                                date: Date.now(),
                                reason: "Campana",
                                hours: 1,
                            }

                            chai.request(server)
                                .post("/truancy/create")
                                .set({ "Authorization": `Bearer ${token}` })
                                .send(truancy)
                                .end(function (err, response) {
                                    console.log(response.body);
                                    truancy_id = response.body.body._id;
                                    done();
                                });
                            done();
                        });
                });
        });
});

describe("Create Truancy", function () {

    it("[1-Create Truancy] | Should return a 201 or 409", function (done) {

        let truancy = {
            ufId: uf_id,
            date: Date.now(),
            reason: "Campaneo",
            hours: 1,
        }

        chai.request(server)
            .post("/truancy/create")
            .set({ "Authorization": `Bearer ${token}` })
            .send(truancy)
            .end(function (err, response) {
                console.log(uf_id);
                console.log(response.body);
                response.status.should.to.be.oneOf([201, 409]);
                response.body.message.should.to.be.oneOf(["ALREADY_EXISTS", "UF_CREATED"]);
                createdTruancyId = response.body.body._id;
                done();
            });
    });

    it("[2- Invalid Schema] | Should return 406", function (done) {

        let truancy = {
            ufId: uf_id,
            date: Date.now(),
            hours: 1,
        }

        chai.request(server)
            .post("/truancy/create")
            .set({ "Authorization": `Bearer ${token}` })
            .send(truancy)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(406);
                response.body.message.should.to.be.equal("NOT_ACCEPTABLE");
                done();
            });
    });

    it("[3- Invalid Patterns] | Should return 406", function (done) {

        let truancy = {
            ufId: uf_id,
            date: Date.now(),
            reason: "Campaneo",
            hours: "Si",
        }

        chai.request(server)
            .post("/truancy/create")
            .set({ "Authorization": `Bearer ${token}` })
            .send(truancy)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(406);
                response.body.message.should.to.be.equal("NOT_ACCEPTABLE");
                done();
            });
    });
});

describe("Update Truancy", function () {

    it("[1-Update Truancy] | Should return a 200, 404, 409, 500", function (done) {

        let truancy = {
            ufId: uf_id,
            date: Date.now(),
            reason: "Campaneo",
            hours: "Si",
        }

        chai.request(server)
            .put(`/truancy/${truancy_id}/edit`)
            .set({ "Authorization": `Bearer ${token}` })
            .send(truancy)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.oneOf([200, 404, 409, 500]);
                response.body.message.should.to.be.oneOf(["OK", "NOT_FOUND", "ALREADY_EXISTS", "DATABASE_ERROR", ]);
                done();
            });
    });
});

describe("Get Truancy", function () {

    it("[1-Get Truancy] | Should return a 200", function (done) {
        chai.request(server)
            .get(`/truancy/${truancy_id}`)
            .set({ "Authorization": `Bearer ${token}` })
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(200);
                response.body.message.should.to.be.equal("OK");
                done();
            });
    });

    it("[2-Get Truancy] | Should return a 500", function (done) {
        chai.request(server)
            .get(`/truancy/${truancy_id}0`)
            .set({ "Authorization": `Bearer ${token}` })
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(500);
                response.body.message.should.to.be.equal("DATABASE_ERROR");
                done();
            });
    });
});

after(async function() {
    let tokenDecode = jwt.decode(token);
    await User.deleteOne({_id: tokenDecode._id});
    await Module.deleteOne({_id: module_id});
    await Uf.deleteOne({_id: uf_id});
    await Uf.deleteOne({_id: createdUfId});
    await Truancy.deleteOne({_id: truancy_id});
    await Truancy.deleteOne({_id: createdTruancyId});
});


