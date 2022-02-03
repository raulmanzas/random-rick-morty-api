const express = require('express');

const logger = require('./src/config/logger');
const environment = require('./src/config/environment');

const app = express();

app.get('/', (_, res) => res.send('test endpoint...'));

const { port } = environment;
app.listen(port, () => {
  logger.info(`API running on port ${port}...`);
});
