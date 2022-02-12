const axios = require('axios');
const retry = require('axios-retry');
const logger = require('../../../config/logger');

function logRequest(req) {
  logger.info('Making request: ', { req });
  return req;
}

function logResponse(res) {
  logger.info('Got response: ', { res });
  return res;
}

function buildClient(baseUrl, timeout = 1000) {
  const client = axios.create({
    baseURL: baseUrl || 'localhost',
    timeout
  });

  retry(client, {
    retries: 3
  });

  client.interceptors.request.use(logRequest);
  client.interceptors.response.use(logResponse);
  return client;
}

module.exports = {
  buildClient,
};
