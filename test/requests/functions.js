// Chai
const chai = require('chai');
const chaiHttp = require('chai-http');

// Server
const server = require('../../server');

// Middleware
chai.use(chaiHttp);

function foo(value){  }

exports.register = function(url, data, callback){
    const request = chai.request(server).post(url).send(data);
    request.end(function(err, res){ 
        return callback(res);
    });
}
