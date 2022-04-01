// Private Route Validator

const {
    checkToken
} = require('../../services/token');

exports.isAuthenticatedPublic = async function(req, res, next){
    try {
        var authorization = req.get('Authorization');
        const token = authorization.replace('Bearer', '').trim();

        if(await checkToken(token)){
            return res.send("redirect to calendar, user authorized");
        }

    } catch (error) {}

    next();
};

