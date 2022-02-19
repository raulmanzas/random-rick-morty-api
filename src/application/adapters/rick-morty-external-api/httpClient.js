const axios = require('axios');
const retry = require('axios-retry');
const logger = require('../../../config/logger');

const HTTP_NOT_FOUND = 404;
const HTTP_SUCCESS = 200;
const HTTP_SERVER_ERROR = 500;

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
  responseStatus: {
    HTTP_NOT_FOUND,
    HTTP_SUCCESS,
    HTTP_SERVER_ERROR
  }
};
