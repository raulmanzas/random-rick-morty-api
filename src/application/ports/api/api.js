const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('yamljs').load('./src/application/ports/api/swagger.yaml');
const environment = require('../../../config/environment');
const logger = require('../../../config/logger');
const router = require('./router');

const app = express();

app.use('/api', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const { port } = environment;

module.exports = {
  getApplication() { return app; },
  run() {
    return app.listen(port, () => {
      logger.info(`API running on port ${port}...`);
    });
  }
};
