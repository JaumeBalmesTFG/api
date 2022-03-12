// Database connection
const mongoose = require('mongoose');

// Database Start
module.exports.initDatabase = function(PORT, URI, app){
    mongoose.connect(URI);

    mongoose.connection.on("error", function(err){
        console.log(`Error connecting to database: ${err}`);
    });

    mongoose.connection.on("connected", function(){
        console.log("Successfully connected to the database");
        startServer(PORT, app);
    });
};

// Server Start
function startServer(PORT, app){
    app.listen(PORT, function(){
        console.log(`> [CTRL+] http://localhost:${PORT}`);
    }).on('error', function(e){
        console.log('> Error happened: ', e.message);
    });
}


