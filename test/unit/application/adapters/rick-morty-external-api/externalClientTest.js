const sinon = require('sinon');
const { assert } = require('chai');
let mockResponse = require('./mockExternalApiResponses.json');
const apiClient = require('../../../../../src/application/adapters/rick-morty-external-api/externalClient');
const httpClient = require('../../../../../src/application/adapters/rick-morty-external-api/httpClient');
const environment = require('../../../../../src/config/environment');

const fakeExternalAPI = 'http://localhost/whatever/api';
const mockHttpClient = {
  get() {
    return {
      data: {
        results: mockResponse
      }
    };
  }
};

describe('ExternalClient', () => {
  describe('getAllEpisodes', () => {
    beforeEach((done) => {
      sinon.stub(environment, 'externalApiBaseUrl').value(fakeExternalAPI);
      sinon
        .stub(httpClient, 'buildClient')
        .withArgs(fakeExternalAPI)
        .returns(mockHttpClient)
        .alwaysCalledWith('/episodes');
      done();
    });

    afterEach((done) => {
      sinon.restore();
      done();
    });

    it('when getting all episodes it should return simplified response', async () => {
      const response = await apiClient.getAllEpisodes();

      assert.isArray(response);
      response.forEach((episode, index) => {
        assert.strictEqual(episode.id, mockResponse[index].id);
        assert.strictEqual(episode.title, mockResponse[index].name);
        assert.strictEqual(episode.episode, mockResponse[index].episode);
        assert.notExists(episode.characters);
        assert.notExists(episode.url);
        assert.notExists(episode.created);
      });
    });

    it('when getting all episodes but none is found should return empty array', async () => {
      mockResponse = [];
      const response = await apiClient.getAllEpisodes();

      assert.isArray(response);
      assert.isEmpty(response);
    });
  });
});
