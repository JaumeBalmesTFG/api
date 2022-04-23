// Database connection
const mongoose = require('mongoose');
const { URI } = require('./config/config');

// // Database Start
// module.exports.initDatabase = function(PORT, URI, app){
//     mongoose.connect(URI);

//     mongoose.connection.on("error", function(err){
//         console.log(`Error connecting to database: ${err}`);
//     });

//     mongoose.connection.on("connected", function(){
//         console.log("Successfully connected to the database");
//         startServer(PORT, app);
//     });
// };

// // Server Start
// function startServer(PORT, app){
//     app.listen(PORT, function(){
//         console.log(`> [CTRL+] http://localhost:${PORT}`);
//     }).on('error', function(e){
//         console.log('> Error happened: ', e.message);
//     });
// }

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

