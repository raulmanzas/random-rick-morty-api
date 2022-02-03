const winston = require('winston');
const environment = require('./environment');

const logger = winston.createLogger({
  level: environment.logLevel,
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
