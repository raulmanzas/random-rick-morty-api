const axios = require('axios');
const retry = require('axios-retry');
const logger = require('../../../config/logger');

function logRequest(req) {
  logger.info(`Making request: ${req}`);
}

function logResponse(res) {
  logger.info(`Got response: ${res}`);
}

function buildClient(baseUrl, timeout = 1000) {
  const client = axios.create({
    baseURL: baseUrl || 'localhost',
    timeout
  });

  console.log(client);
  retry(client, {
    retries: 3
  });
  console.log(client);

  client.interceptors.request.use(logRequest);
  client.interceptors.response.use(logResponse);
  return client;
}

module.exports = {
  buildClient,
};
