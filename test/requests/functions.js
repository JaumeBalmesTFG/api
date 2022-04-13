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

exports.post = function (url, token, data) {
    return  chai.request(server)
        .post(url)
        .set({ "Authorization": `Bearer ${token}` })
        .send(data);
}

exports.get = function (url, token, data) {
    return chai.request(server)
        .get(url)
        .set({ "Authorization": `Bearer ${token}` })
        .send(data);
}

exports.edit = function (url, token, data) {
    return chai.request(server)
        .put(url)
        .set({ "Authorization": `Bearer ${token}` })
        .send(data);
}

exports.delete = function (url, token, data) {
    return chai.request(server)
        .delete(url)
        .set({ "Authorization": `Bearer ${token}` })
        .send(data);
}