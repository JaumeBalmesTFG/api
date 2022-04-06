// Configuration filter

module.exports = {
  // Server port
  PORT: process.env.PORT || 8080,

  // Databse connection uri
  URI: process.argv[2] || "mongodb://127.0.0.1:27017/testAPI",

  // Number of rounds for the password encryption
  ROUNDS: 8,

  // Server Host
  HOST: "http://localhost:8080",

  // Token Generation Secrey Key
  SECRET: 'secret',
};

