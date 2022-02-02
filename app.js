const express = require('express');

const logger = require('./src/config/logger');

const app = express();
const port = 8080;

app.get('/', (_, res) => res.send('test endpoint...'));

app.listen(port, () => {
  logger.info(`API running on port ${port}...`);
});
