const { assert } = require('chai');
const sinon = require('sinon');
const externalClientProxy = require('../../../../../src/application/domain/proxies/externalApiProxy');
const useCase = require('../../../../../src/application/domain/usecases/getAllEpisodes');

const mockEpisodes = [
  {
    id: 1,
    title: 'a episode',
    episode: 'S01E01'
  },
  {
    id: 2,
    title: 'another episode',
    episode: 'S01E02'
  }
];

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
    const episodes = await useCase.getAllEpisodes();

    assert.isArray(episodes);
    assert.strictEqual(episodes.length, 2);
    assert.strictEqual(episodes[0].title, mockEpisodes[0].title);
    assert.strictEqual(episodes[0].season, 'S01');
    assert.strictEqual(episodes[0].episode, 'E01');
  });

  it('when external client respondes with episodes without titles it should throw an error', async () => {
    const episodesWithoutTitle = mockEpisodes.map((episode) => ({
      id: episode.id,
      episode: episode.episode
    }));
    sinon.stub(externalClientProxy, 'getAllEpisodes').returns(episodesWithoutTitle);

    try {
      await useCase.getAllEpisodes();
      assert.fail();
    } catch (error) {
      assert.isDefined(error);
      assert.strictEqual(error.message, 'An episode was returned from the external API without title');
    }
  });

  it('when external client respondes with episodes with invalid season/episode it should throw an error', async () => {
    const episodesWithoutTitle = mockEpisodes.map((episode) => ({
      id: episode.id,
      title: episode.title,
      episode: 'abcd'
    }));
    sinon.stub(externalClientProxy, 'getAllEpisodes').returns(episodesWithoutTitle);

    try {
      await useCase.getAllEpisodes();
      assert.fail();
    } catch (error) {
      assert.isDefined(error);
      assert.strictEqual(error.message, 'An episode was returned from the external API with an invalid season/episode');
    }
  });
});
