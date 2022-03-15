// Token Methods

const jwt = require('jsonwebtoken');

// SECRET KEY
const SECRET = require('../config/config').SECRET;

// Generate token
exports.generateToken = async function(user_email, user_id){
    return await jwt.sign({ email: user_email, _id: user_id }, SECRET, {});
}

