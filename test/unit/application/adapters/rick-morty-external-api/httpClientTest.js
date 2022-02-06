const { assert } = require('chai');

const httpClient = require('../../../../../src/application/adapters/rick-morty-external-api/httpClient');

describe('httpClient', () => {
  it('when creating a new httpClient it should have logging interceptors by default', () => {
    const newClient = httpClient.buildClient();

    const requestInterceptors = newClient.interceptors.request.handlers;
    assert.strictEqual(requestInterceptors.pop().fulfilled.name, 'logRequest');

    const responseInterceptors = newClient.interceptors.response.handlers;
    assert.strictEqual(responseInterceptors.pop().fulfilled.name, 'logResponse');
  });

  it('when creating client without passing baseUrl it should set to localhost', () => {
    const newClient = httpClient.buildClient();

    assert.strictEqual(newClient.defaults.baseURL, 'localhost');
  });

  it('when creating client with custom baseURl it should set as the default baseURL', () => {
    const fakeUrl = 'custom.url';
    const newClient = httpClient.buildClient(fakeUrl);

    assert.strictEqual(newClient.defaults.baseURL, fakeUrl);
  });

  it('when creating a client without custom timeout it should default to 1 second', () => {
    const newClient = httpClient.buildClient();

    assert.strictEqual(newClient.defaults.timeout, 1000);
  });

  it('when creating a client with custom timeout it should set as the default timeout', () => {
    const customTimeOut = 5000;
    const newClient = httpClient.buildClient('', customTimeOut);

    assert.strictEqual(newClient.defaults.timeout, customTimeOut);
  });
});
