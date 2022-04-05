
// Checkers
exports.checkPathObjectId = function(objectId){
    return /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(objectId);
}