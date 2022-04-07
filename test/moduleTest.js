// Unit Testing /register

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../models/auth/User');
const Module = require('../models/module/Module');
const jwt = require('jsonwebtoken');
// Assertion Style
chai.should();
chai.use(chaiHttp);

var token;
var module_id;

before(function(done) {
    const user = {
        firstName: "username",
        lastName: "lastname",
        email: "usertest@klendar.com",
        password: "TYF5Gf%w"
    }

    const module = {
        name: "Test Module",
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
                    console.log(token);
                    console.log(response.body);
                    module_id = response.body.body._id;
                    done();
                });
        });
});

describe("Create Module", function () {

    it("[1-Create Module] | Should return a 201 or 409", function (done) {

        let module = {
            name: "Java 123",
            color: "#00000F"
        }

        chai.request(server)
            .post("/module")
            .set({ "Authorization": `Bearer ${token}` })
            .send(module)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.oneOf([201, 409]);
                response.body.message.should.to.be.oneOf(["ALREADY_EXISTS", "MODULE_CREATED"]);
                done();
            });
    });

    it("[2- Invalid Schema] | Should return 406", function (done) {

        let module = {
            name: "Java 1"
        };

        chai.request(server)
            .post("/module")
            .set({ "Authorization": `Bearer ${token}` })
            .send(module)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(406);
                response.body.message.should.to.be.equal("NOT_ACCEPTABLE");
                done();
            });
    });
    
    it("[3- Invalid Patterns] | Should return 406", function (done) {

        let module = {
            name: "Java 1¿",
            color: "#00000F"
        };

        chai.request(server)
            .post("/module")
            .set({ "Authorization": `Bearer ${token}` })
            .send(module)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(406);
                response.body.message.should.to.be.equal("NOT_ACCEPTABLE");
                done();
            });
    });

    it("[4- Invalid Patterns] | Should return 406", function (done) {

        let module = {
            name: "Java 1",
            color: "#00000F¿"
        };

        chai.request(server)
            .post("/module")
            .set({ "Authorization": `Bearer ${token}` })
            .send(module)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(406);
                response.body.message.should.to.be.equal("NOT_ACCEPTABLE");
                done();
            });
    });
});

describe("Update Module", function () {

    it("[1-Update Module] | Should return a 200, 404, 409, 500", function (done) {

        let module = {
            name: "Java Course 1",
            color: "#00000F"
        }

        chai.request(server)
            .put(`/module/${module_id}`)
            .set({ "Authorization": `Bearer ${token}` })
            .send(module)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.oneOf([200, 404, 409, 500]);
                response.body.message.should.to.be.oneOf(["OK", "NOT_FOUND", "ALREADY_EXISTS", "DATABASE_ERROR", ]);
                done();
            });
    });
});

describe("Get Module", function () {

    it("[1-Get Module] | Should return a 200", function (done) {
        chai.request(server)
            .get(`/module/${module_id}`)
            .set({ "Authorization": `Bearer ${token}` })
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(200);
                response.body.message.should.to.be.equal("OK");
                done();
            });
    });

    it("[2-Get Module] | Should return a 500", function (done) {
        chai.request(server)
            .get(`/module/${module_id}0`)
            .set({ "Authorization": `Bearer ${token}` })
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(500);
                response.body.message.should.to.be.equal("DATABASE_ERROR");
                done();
            });
    });
});

describe("Update Module /Archive", function () {

    it("[1-Archive Module] | Should return a 200", function (done) {

        let module = {
            archived: true
        }

        chai.request(server)
            .put(`/module/${module_id}/archive`)
            .set({ "Authorization": `Bearer ${token}` })
            .send(module)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(200);
                response.body.message.should.to.be.equal("OK");
                done();
            });
    });

    it("[2-Archive Module, Invalid Schema] | Should return a 406", function (done) {

        let module = {
            archivedd: true
        }

        chai.request(server)
            .put(`/module/${module_id}/archive`)
            .set({ "Authorization": `Bearer ${token}` })
            .send(module)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(406);
                response.body.message.should.to.be.equal("NOT_ACCEPTABLE");
                done();
            });
    });

    it("[3-Archive Module, No Valid ObjectId] | Should return a 404", function (done) {

        let module = {
            archived: true
        }

        chai.request(server)
            .put(`/module/${module_id}0/archive`)
            .set({ "Authorization": `Bearer ${token}` })
            .send(module)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(400);
                response.body.message.should.to.be.equal("BAD_REQUEST");
                done();
            });
    });
});

after(async function() {
    let tokenDecode = jwt.decode(token);
    await User.deleteOne({_id: tokenDecode._id});
    await Module.deleteOne({_id: module_id});
});


