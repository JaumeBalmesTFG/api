// Unit Testing /register

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

// Assertion Style
chai.should();
chai.use(chaiHttp);

describe("Login Controller", function () {
    /**
     * Correct Request
     * Should return a 200,
     * 200 => login was successful
     */
    it("Correct Request | Should return a 200", function (done) {
        const user = {
            email: "test@klendar.com",
            password: "Klendar123"
        }

        chai.request(server)
            .post("/login")
            .send(user)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(202);
                response.body.message.should.to.be.equal("LOGIN_SUCCESSFUL");
                done();
            });
    });

    /**
     * Unallowed Body Request Schema Fields
     * Should return a 406 status code,
     * 406 => Invalid request body
     */
    it("Unallowed Body Request Schema Fields | Should return a 406 status code", function (done) {
        const user = {
            test: "troll",
            email: "test@klendar.com"
        }

        chai.request(server)
            .post("/login")
            .send(user)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(406);
                response.body.error.should.to.be.equal("NOT_ACCEPTABLE");
                done();
            });
    });


    /********** START EMPTY FIELDS TEST ************/

    /**
     * Empty Email
     * Should return a 406 status code,
     * 406 => email can't be empty
     */
    it("Empty Email | Should return a 406 status code", function (done) {
        const user = {
            password: "Klendar123"
        }

        chai.request(server)
            .post("/login")
            .send(user)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(406);
                response.body.error.should.to.be.equal("NOT_ACCEPTABLE");
                done();
            });
    });

    /**
     * Empty password
     * Should return a 406 status code,
     * 406 => password can't be empty
     */
    it("Empty Password | Should return a 406 status code", function (done) {
        const user = {
            email: "test@klendar.com"
        }

        chai.request(server)
            .post("/login")
            .send(user)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(406);
                response.body.error.should.to.be.equal("NOT_ACCEPTABLE");
                done();
            });
    });

    /********** END EMPTY FIELDS TEST ************/

    /********** START INVALID FORMAT TEST ************/

    /**
     * Invalid Email format
     * Should return a 406 status code,
     * 406 => Email must be a valid email
     */
    it("Invalid Email Format | Should return a 406 status code", function (done) {
        const user = {
            email: "klendar.com",
            password: "Klendar123"
        }

        chai.request(server)
            .post("/login")
            .send(user)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(406);
                response.body.error.should.to.be.equal("NOT_ACCEPTABLE");
                done();
            });
    });

    /********** END INVALID FORMAT TEST ************/

    /**
     * Password invalid min length
     * Should return a 406 status code,
     * 406 => Password must have lowercase, uppercase and numbers, special characters are optional
     */
    it("Invalid Password Min Length | Should return a 406 status code", function (done) {
        const user = {
            email: "test@klendar.com",
            password: "123"
        }

        chai.request(server)
            .post("/login")
            .send(user)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(406);
                response.body.error.should.to.be.equal("NOT_ACCEPTABLE");
                done();
            });
    });

    /**
     * Password invalid Max length
     * Should return a 406 status code,
     * 406 => Password must have lowercase, uppercase and numbers, special characters are optional
     */
    it("Invalid Password Max Length | Should return a 406 status code", function (done) {
        const user = {
            email: "test@klendar.com",
            password: "123456789123456789123456789123456789123456789123456789123456789"
        }

        chai.request(server)
            .post("/login")
            .send(user)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(406);
                response.body.error.should.to.be.equal("NOT_ACCEPTABLE");
                done();
            });
    });

    /**
     * Password invalid format, only lowercase letters
     * Should return a 406 status code,
     * 406 => Password must have lowercase, uppercase and numbers, special characters are optional
     */
    it("Invalid Password Format [ONLY LW_LETTERS] | Should return a 406 status code", function (done) {
        const user = {
            email: "test@klendar.com",
            password: "abcdefghij"
        }

        chai.request(server)
            .post("/login")
            .send(user)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(406);
                response.body.error.should.to.be.equal("NOT_ACCEPTABLE");
                done();
            });
    });

    /**
     * Password invalid format, only lowercase and uppercase letters
     * Should return a 406 status code,
     * 406 => Password must have lowercase, uppercase and numbers, special characters are optional
     */
    it("Invalid Password Format [ONLY LW_LETTERS, UPP_LETTERS] | Should return a 406 status code", function (done) {
        const user = {
            email: "test@klendar.com",
            password: "Klendar"
        }

        chai.request(server)
            .post("/login")
            .send(user)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(406);
                response.body.error.should.to.be.equal("NOT_ACCEPTABLE");
                done();
            });
    });

    /**
     * Correct password format, only lowercase and uppercase letters, contains numbers
     * Should return a 202 status code,
     * 202 => USER CREATED
     * 409 => EMAIL EXISTS
     */

    it("Correct email and password | Should return a 202 status code", function (done) {
        const user = {
            email: "test@klendar.com",
            password: "Klendar123"
        }

        chai.request(server)
            .post("/login")
            .send(user)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(202);
                response.body.message.should.to.be.equal("LOGIN_SUCCESSFUL");
                done();
            });
    });

    /**
     * Correct password format, only lowercase and uppercase letters, contains numbers, contains special chars
     * Should return a 202 status code,
     * 202 => LOGIN SUCCESSFUL
     */
    it("Correct password format only lowercase and uppercase letters, contains numbers, contains special chars  | Should return a 202 status code", function (done) {
        const user = {
            email: "specialtest@klendar.com",
            password: "Klendar123!"
        }

        chai.request(server)
            .post("/login")
            .send(user)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(202);
                response.body.message.should.to.be.equal("LOGIN_SUCCESSFUL");
                done();
            });
    });

    /**
     * Invalid password format, only lowercase and uppercase letters, contains numbers, contains special chars
     * Should return a 406 status code
     * ALLOWED SPECIAL CHARS = [!@#$%^&*?]
     */
    it("Invalid Password Format [ONLY LW_LETTERS, UPP_LETTERS, LETTERS, INVALID SPECIAL CHARS] | Should return a 406 status code", function (done) {
        const user = {
            firstName: "username",
            lastName: "lasname",
            email: "user@user8.com",
            password: "abcd?eF/Ghij23"
        }

        chai.request(server)
            .post("/login")
            .send(user)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(406);
                response.body.error.should.to.be.equal("NOT_ACCEPTABLE");
                done();
            });
    });
});

