// Unit Testing /register

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const jwt = require("jsonwebtoken");
const User = require("../models/auth/User");

// Assertion Style
chai.should();
chai.use(chaiHttp);

var token;

/**
 *  NOTES!
 * 
 *  All string fields such firstName, lastName...
 *  should come from the frontend in a lowercase format.
 *  
 *  Except fields: password
 */
describe("Register Controller", function () {
    /**
     * Correct Request
     * Should return a 200 or 409 status code, 
     * 200 => registration was completed succesfully
     * 409 => means that the email already exists
     */
    it("Correct Request | Should return a 200 or 409 status code", function (done) {
        const user = {
            firstName: "userqwename",
            lastName: "lastname",
            email: "user@user3.com",
            password: "TYF5Gf%w"
        }

        chai.request(server)
            .post("/register")
            .send(user)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.oneOf([201, 409]);
                response.body.message.should.to.be.oneOf(["EMAIL_EXISTS", "USER_CREATED"]);
                console.log(response);
                token = response.body.token;
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
            lastName: "lastname",
            email: "user@user3.com",
            password: "TYF5Gf%w"
        }

        chai.request(server)
            .post("/register")
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
     * Empty firstName
     * Should return a 406 status code, 
     * 406 => firstName can't be empty
     */
    it("Empty FirstName | Should return a 406 status code", function (done) {
        const user = {
            firstName: "",
            lastName: "lastname",
            email: "user@user3.com",
            password: "TYF5Gf%w"
        }

        chai.request(server)
            .post("/register")
            .send(user)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(406);
                response.body.error.should.to.be.equal("NOT_ACCEPTABLE");
                done();
            });
    });

    /**
     * Empty lastName
     * Should return a 406 status code, 
     * 406 => lastName can't be empty
     */
    it("Empty LastName | Should return a 406 status code", function (done) {
        const user = {
            firstName: "username",
            lastName: "",
            email: "user@user3.com",
            password: "TYF5Gf%w"
        }

        chai.request(server)
            .post("/register")
            .send(user)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(406);
                response.body.error.should.to.be.equal("NOT_ACCEPTABLE");
                done();
            });
    });

    /**
     * Empty Email
     * Should return a 406 status code, 
     * 406 => Email is not allowed to be empty
     */
    it("Invalid FirstName Format | Should return a 406 status code", function (done) {
        const user = {
            firstName: "username",
            lastName: "lastname",
            email: "",
            password: "TYF5Gf%w"
        }

        chai.request(server)
            .post("/register")
            .send(user)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(406);
                response.body.error.should.to.be.equal("NOT_ACCEPTABLE");
                done();
            });
    });

    /**
     * Empty Password
     * Should return a 406 status code, 
     * 406 => Password can't be empty
     */
    it("Empty Password | Should return a 406 status code", function (done) {
        const user = {
            firstName: "username",
            lastName: "lastname",
            email: "",
            password: "TYF5Gf%w"
        }

        chai.request(server)
            .post("/register")
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
     * Invalid FirstName format
     * Should return a 406 status code, 
     * 406 => required pattern: /^[a-z]+$/'
    */
    it("Invalid FirstName Format | Should return a 406 status code", function (done) {
        const user = {
            firstName: "user1name",
            lastName: "lastname",
            email: "user@user.com",
            password: "TYF5Gf%w"
        }

        chai.request(server)
            .post("/register")
            .send(user)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(406);
                response.body.error.should.to.be.equal("NOT_ACCEPTABLE");
                done();
            });
    });

    /**
     * Invalid LastName format
     * Should return a 406 status code, 
     * 406 => required pattern: /^[a-z]+$/'
    */

    it("Invalid LastName Format | Should return a 406 status code", function (done) {
        const user = {
            firstName: "username",
            lastName: "last1name",
            email: "user@user.com",
            password: "TYF5Gf%w"
        }

        chai.request(server)
            .post("/register")
            .send(user)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(406);
                response.body.error.should.to.be.equal("NOT_ACCEPTABLE");
                done();
            });
    });

    /**
     * Invalid Email format
     * Should return a 406 status code, 
     * 406 => Email must be a valid email
    */
    it("Invalid Email Format | Should return a 406 status code", function (done) {
        const user = {
            firstName: "username",
            lastName: "lasname",
            email: "useruser.com",
            password: "TYF5Gf%w"
        }

        chai.request(server)
            .post("/register")
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
            firstName: "username",
            lastName: "lasname",
            email: "user@user.com",
            password: "123"
        }

        chai.request(server)
            .post("/register")
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
            firstName: "username",
            lastName: "lasname",
            email: "user@user.com",
            password: "123456789123456789123456789123456789123456789123456789123456789"
        }

        chai.request(server)
            .post("/register")
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
            firstName: "username",
            lastName: "lasname",
            email: "user@user.com",
            password: "abcdefghij"
        }

        chai.request(server)
            .post("/register")
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
            firstName: "username",
            lastName: "lasname",
            email: "user@user.com",
            password: "abcdeFGhij"
        }

        chai.request(server)
            .post("/register")
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
    * Should return a 201 status code, 
    * 201 => USER CREATED
    * 409 => EMAIL EXISTS 
    */
    it("Invalid Password Format [ONLY LW_LETTERS, UPP_LETTERS, NUMBERS] | Should return a 406 status code", function (done) {
        const user = {
            firstName: "username",
            lastName: "lasname",
            email: "user@user7.com",
            password: "abcdeFGhij23"
        }

        chai.request(server)
            .post("/register")
            .send(user)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.oneOf([201, 409]);
                response.body.message.should.to.be.oneOf(["EMAIL_EXISTS", "USER_CREATED"]);
                done();
            });
    });

    /**
    * Correct password format, only lowercase and uppercase letters, contains numbers, contains special chars
    * Should return a 201 status code, 
    * 201 => USER CREATED
    * 409 => EMAIL EXISTS 
    */
    it("Invalid Password Format [ONLY LW_LETTERS, UPP_LETTERS, LETTERS, SPECIAL CHARS] | Should return a 406 status code", function (done) {
        const user = {
            firstName: "username",
            lastName: "lasname",
            email: "user@user8.com",
            password: "abcdeF@Ghij23"
        }

        chai.request(server)
            .post("/register")
            .send(user)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.oneOf([201, 409]);
                response.body.message.should.to.be.oneOf(["EMAIL_EXISTS", "USER_CREATED"]);
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
            .post("/register")
            .send(user)
            .end(function (err, response) {
                console.log(response.body);
                response.status.should.to.be.equal(406);
                response.body.error.should.to.be.equal("NOT_ACCEPTABLE");
                done();
            });
    });
});

after(async function() {
    let tokenDecode = jwt.decode(token);
    console.log(token);
    console.log(tokenDecode);
    await User.deleteOne({_id: tokenDecode._id});
});

