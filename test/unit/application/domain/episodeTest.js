const { assert } = require('chai');
const episodeHelper = require('../../../../src/application/domain/episode');

const rawEpisode = {
  id: 1,
  title: 'a episode',
  episode: 'S01E01'
};

describe('episode helper', () => {
  it('when parsing a valid raw episode it should it correctly parsed', () => {
    const parsedEpisode = episodeHelper.parseRawEpisode(rawEpisode);

    assert.strictEqual(parsedEpisode.title, rawEpisode.title);
    assert.strictEqual(parsedEpisode.season, 'S01');
    assert.strictEqual(parsedEpisode.episode, 'E01');
  });

  it('when parsing a raw episode without title it should fail', () => {
    const { title, ...episodeWithoutTitle } = rawEpisode;
    try {
      episodeHelper.parseRawEpisode(episodeWithoutTitle);
      assert.fai();
    } catch (error) {
      assert.isDefined(error);
      assert.strictEqual(error.message, 'An episode was returned from the external API without title');
    }
  });

  it('when parsing a raw episode with invalid episode code it should fail', () => {
    const invalidEpisode = { ...rawEpisode, episode: 'E01' };
    try {
      episodeHelper.parseRawEpisode(invalidEpisode);
      assert.fai();
    } catch (error) {
      assert.isDefined(error);
      assert.strictEqual(error.message, 'An episode was returned from the external API with an invalid season/episode');
    }
  });
});
