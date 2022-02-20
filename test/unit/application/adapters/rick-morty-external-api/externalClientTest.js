const sinon = require('sinon');
const { assert } = require('chai');
let mockResponse = require('./mockExternalApiResponses.json');
const apiClient = require('../../../../../src/application/adapters/rick-morty-external-api/externalClient');
const httpClient = require('../../../../../src/application/adapters/rick-morty-external-api/httpClient');
const environment = require('../../../../../src/config/environment');

const fakeExternalAPI = 'http://localhost/whatever/api';
let responseStatus = httpClient.responseStatus.HTTP_SUCCESS;
const mockHttpClient = {
  get() {
    return {
      status: responseStatus,
      data: {
        info: {
          count: mockResponse.length
        },
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

  describe('getEpisodeById', () => {
    const validEpisodeId = 1;
    const originalResponse = mockResponse.slice();

    beforeEach((done) => {
      sinon.stub(environment, 'externalApiBaseUrl').value(fakeExternalAPI);
      sinon
        .stub(httpClient, 'buildClient')
        .withArgs(fakeExternalAPI)
        .returns(mockHttpClient)
        .alwaysCalledWith(`/episodes/${validEpisodeId}`);
      done();
    });

    afterEach((done) => {
      mockResponse = originalResponse;
      responseStatus = httpClient.responseStatus.HTTP_SUCCESS;
      sinon.restore();
      done();
    });

    it('when passing an undefined id it should fail', async () => {
      try {
        await apiClient.getEpisodeById(undefined);
        assert.fail();
      } catch (error) {
        assert.isDefined(error);
        assert.strictEqual(
          error.message,
          'The episode id must be supplied in order to fetch its data'
        );
      }
    });

    it('when passing a valid id it should return its corresponding episode', async () => {
      mockResponse = mockResponse.shift();
      const response = await apiClient.getEpisodeById(validEpisodeId);

      assert.isObject(response);
      assert.strictEqual(response.id, validEpisodeId);
      assert.strictEqual(response.title, mockResponse.name);
      assert.strictEqual(response.episode, mockResponse.episode);
    });

    it('when an non existent episode id is passed it should fail', async () => {
      responseStatus = httpClient.responseStatus.HTTP_NOT_FOUND;

      try {
        await apiClient.getEpisodeById(9);
        assert.fail();
      } catch (error) {
        assert.isDefined(error);
        assert.strictEqual(error.message, 'Requested episode could not be found');
      }
    });

    it('when an unexpected error happens it should fail', async () => {
      responseStatus = httpClient.responseStatus.HTTP_SERVER_ERROR;

      try {
        await apiClient.getEpisodeById(validEpisodeId);
        assert.fail();
      } catch (error) {
        assert.isDefined(error);
        assert.strictEqual(error.message, 'Unexpected error happened while fetching episode data');
      }
    });
  });

  describe('getNumberOfEpisodes', () => {
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

    it('when fetching total number of episodes it should return a valid integer', async () => {
      const numberOfEpisodes = await apiClient.getNumberOfEpisodes();

      assert.isNumber(numberOfEpisodes);
      assert.strictEqual(numberOfEpisodes, mockResponse.length);
    });
  });
});
