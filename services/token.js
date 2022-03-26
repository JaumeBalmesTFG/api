// Token Methods

const res = require('express/lib/response');
const jwt = require('jsonwebtoken');

// SECRET KEY
const SECRET = require('../config/config').SECRET;

// Generate token
exports.generateToken = async function(user_email, user_id){
    return await jwt.sign({ email: user_email, _id: user_id }, SECRET, {});
};

// Check Token
exports.checkToken = function(token){
    // jwt.verify(token, SECRET, function(err, decoded){});
    return;
}



