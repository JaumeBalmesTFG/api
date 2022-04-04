// Unit Testing /register

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

// Assertion Style
chai.should();
chai.use(chaiHttp);

describe("Create Module", function () {

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlcjMuY29tIiwiX2lkIjoiNjI0OGI0YzBiYjYzNzUzMmRmMzViMDJkIiwiaWF0IjoxNjQ4OTMyMDMyfQ.aIfWVauUVaUDwPMr0murf650gal1ZANivWv32CsWp-w";

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
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlcjMuY29tIiwiX2lkIjoiNjI0OGI0YzBiYjYzNzUzMmRmMzViMDJkIiwiaWF0IjoxNjQ4OTMyMDMyfQ.aIfWVauUVaUDwPMr0murf650gal1ZANivWv32CsWp-w";
    const module_id = "624a0d1f466951bccc09260f";

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



