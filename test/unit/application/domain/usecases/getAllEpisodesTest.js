const { assert } = require('chai');
const sinon = require('sinon');
const externalClientProxy = require('../../../../../src/application/domain/proxies/externalApiProxy');
const useCase = require('../../../../../src/application/domain/usecases/getAllEpisodes');
const mockEpisodes = require('./mockEpisodes.json');
const episodeHelper = require('../../../../../src/application/domain/episode');

describe('get all episodes usecase', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('when external client responds with no episodes it should return an empty list', async () => {
    sinon.stub(externalClientProxy, 'getAllEpisodes').returns([]);
    const response = await useCase.getAllEpisodes();

    assert.isArray(response);
    assert.isEmpty(response);
  });

  it('when external client responds with episodes it should return them as a list', async () => {
    sinon.stub(externalClientProxy, 'getAllEpisodes').returns(mockEpisodes);
    sinon.stub(episodeHelper, 'parseRawEpisode').returns(new Array(3));

    const episodes = await useCase.getAllEpisodes();

    assert.isArray(episodes);
    assert.strictEqual(episodes.length, 3);
  });
});
