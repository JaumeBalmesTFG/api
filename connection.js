// Database connection
const mongoose = require('mongoose');
const { URI } = require('./config/config');

function connect(){
    return new Promise(function(resolve, reject){
        mongoose.connect(URI)
            .then(function(res, err){
                if(err) return reject(err);
                resolve();
            })
    });
}

function close(){
    return mongoose.disconnect();
}

module.exports = { connect, close };

