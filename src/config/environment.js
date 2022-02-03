const dotenv = require('dotenv');

function loadEnvironment() {
  dotenv.config();
  return {
    env: process.env.NODE_ENV,
    port: process.env.PORT
  };
}

module.exports = loadEnvironment();
