// Token Methods

const jwt = require('jsonwebtoken');

// Export user model
const User = require('../models/auth/User');
const { checkJWTpattern } = require('./checker');

// SECRET KEY
const SECRET = require('../config/config').SECRET;

// Generate token
exports.generateToken = async function (user_email, user_id) {
    return await jwt.sign({ email: user_email, _id: user_id }, SECRET, {});
};

// Check Token
exports.checkToken = async function (token) {
    try {

        const decoded = await jwt.verify(token, SECRET);

        if(!decoded){
            return false;
        }

        const match = await User.findOne({
            _id: decoded._id,
            email: decoded.email,
            token: token
        });

        if (!match) {
            return false;
        }

        return decoded;

    } catch (error) {

        return false;
    }
}



