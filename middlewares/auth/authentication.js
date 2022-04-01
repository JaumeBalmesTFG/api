// Private Route Validator

const {
    checkToken
} = require('../../services/token');

exports.isAuthenticatedPublic = async function(req, res, next){
    try {
        var authorization = req.get('Authorization');
        const token = authorization.replace('Bearer', '').trim();

        if(await checkToken(token)){
            throw err;
        }

    } catch (error) {
        return res.send("redirect to calendar, user authorized");
    }

    next();
};

exports.isAuthenticatedPrivate = async function(req, res, next){
    try {
        var authorization = req.get('Authorization');
        const token = authorization.replace('Bearer', '').trim();

        const decoded = await checkToken(token);

        if(!decoded){
            throw err;
        }

        req.authUserId = decoded._id;
        req.email = decoded.email;

    } catch (error) {
        return res.send("return to login page, user not authorized");
    }

    next();
};

