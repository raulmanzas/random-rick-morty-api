const { assert } = require('chai');
const sinon = require('sinon');
const externalClientProxy = require('../../../../../src/application/domain/proxies/externalApiProxy');
const useCase = require('../../../../../src/application/domain/usecases/getRandomEpisode');
const mockEpisodes = require('./mockEpisodes.json');

function episodeIdWithinLimits(selectedEpisodeId) {
  return selectedEpisodeId >= 0 && selectedEpisodeId < mockEpisodes.length;
}

describe('get random episode use case', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('when getting a random episode it should return sucessfully', async () => {
    sinon
      .stub(externalClientProxy, 'getEpisodeById')
      .returns(mockEpisodes[0]);

    const randomEpisode = await useCase.getRandomEpisode();

    assert.isDefined(randomEpisode);
    assert.strictEqual(randomEpisode.title, mockEpisodes[0].title);
    assert.isTrue(
      externalClientProxy.getEpisodeById.calledWith(sinon.match(episodeIdWithinLimits))
    );
  });

  it('when an unexpected error happens while fetching random episode it should fail', async () => {
    sinon.stub(externalClientProxy, 'getEpisodeById').throws(new Error('some error'));
    try {
      await useCase.getRandomEpisode();
      assert.fail();
    } catch (error) {
      assert.isDefined(error);
      assert.strictEqual(error.message, 'some error');
    }
  });
});
