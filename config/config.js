// Configuration filter

module.exports = {
  // Server port
  PORT: process.env.PORT || 8080,

  // Databse connection uri
  URI: process.argv[2] || "mongodb://127.0.0.1:27017/KlendarAPI",

  // Test Mocha Database Uri
  URI_TEST: "mongodb://db:27017/TestKlendarAPI",

  // Number of rounds for the password encryption
  ROUNDS: 8,

  // Server Host
  HOST: "http://localhost:8080",

  // Token Generation Secrey Key
  SECRET: '#(7B.+dA,p8@pPD}D%x|M]Y1gT"[1=EwB`/RNoaI^[{-7p`i>4/X,Qf]x;i$K',
};

