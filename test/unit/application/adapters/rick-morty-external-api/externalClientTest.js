const sinon = require('sinon');
const { assert } = require('chai');
const mockResponse = require('./mockExternalApiResponses.json');
const apiClient = require('../../../../../src/application/adapters/rick-morty-external-api/externalClient');
const httpClient = require('../../../../../src/application/adapters/rick-morty-external-api/httpClient');

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
  before((done) => {
    sinon.stub(httpClient, 'buildClient').returns(mockHttpClient);
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

  // it('when getting all episodes but none is found should return empty array', async () => {

  // });
});
