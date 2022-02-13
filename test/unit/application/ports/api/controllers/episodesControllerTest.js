const { assert } = require('chai');
const sinon = require('sinon');
const episodesController = require('../../../../../../src/application/ports/api/controllers/episodesController');
const useCase = require('../../../../../../src/application/domain/usecases/getAllEpisodes');
const MockResponse = require('./mockExpressResponse');

const mockEpisodes = [
  {
    id: 1,
    title: 'a episode',
    season: 'S01',
    episode: 'E01'
  },
  {
    id: 2,
    title: 'another episode',
    season: 'S01',
    episode: 'E02'
  }
];

describe('episodes controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('when use case returns list of episodes it should pass them to res object', async () => {
    sinon.stub(useCase, 'getAllEpisodes').returns(mockEpisodes);
    const mockResponse = new MockResponse();

    await episodesController.get({}, mockResponse);

    assert.strictEqual(mockResponse.statusCode, 200);

    const { jsonResponse } = mockResponse;
    assert.isDefined(jsonResponse.timestamp);
    assert.strictEqual(jsonResponse.data.length, 2);
  });

  it('whe use case runs into an error it should return an 500 unknown error', async () => {
    sinon.stub(useCase, 'getAllEpisodes').throws(new Error());
    const mockResponse = new MockResponse();

    await episodesController.get({}, mockResponse);

    assert.strictEqual(mockResponse.statusCode, 500);

    const { jsonResponse } = mockResponse;
    assert.isDefined(jsonResponse.timestamp);
    assert.strictEqual(jsonResponse.message, 'Unknown error happened');
  });
});
