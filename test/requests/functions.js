// Chai
const chai = require('chai');
const chaiHttp = require('chai-http');

// Server
const server = require('../../server');

// Middleware
chai.use(chaiHttp);

exports.auth = function (url, data, callback) {
    return chai.request(server).post(url).send(data);
}

exports.module = function (url, token, data) {
    return chai.request(server)
        .post(url)
        .set({ "Authorization": `Bearer ${token}` })
        .send(data);
}