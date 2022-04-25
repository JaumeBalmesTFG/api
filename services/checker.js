
// Checkers
exports.checkPathObjectId = function(objectId){
    return /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(objectId);
}

exports.checkJWTpattern = function(token){
    return /^[A-Za-z0-9\\-_=]+\\.[A-Za-z0-9\\-_=]+(\\.[A-Za-z0-9\\-_.+/=]+)?$/.test(token);
}