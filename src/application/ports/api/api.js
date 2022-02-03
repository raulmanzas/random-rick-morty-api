const express = require('express');
const environment = require('../../../config/environment');
const logger = require('../../../config/logger');
const router = require('./router');

const app = express();

app.use('/api', router);

const { port } = environment;

module.exports = {
  run() {
    app.listen(port, () => {
      logger.info(`API running on port ${port}...`);
    });
  }
};