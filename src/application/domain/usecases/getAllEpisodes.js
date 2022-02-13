const externalClientProxy = require('../proxies/externalApiProxy');

function validateEpisode(rawEpisodeData) {
  if (!rawEpisodeData.title) {
    throw new Error('An episode was returned from the external API without title');
  }
  const seasonEpisodePattern = /^S\d{2}E\d{2}$/;
  if (!seasonEpisodePattern.test(rawEpisodeData.episode)) {
    throw new Error('An episode was returned from the external API with an invalid season/episode');
  }
}

function parseRawEpisode(rawEpisodeData) {
  validateEpisode(rawEpisodeData);
  const seasonCodeLength = 3;
  const episodeCodeLength = 3;
  return {
    title: rawEpisodeData.title,
    season: rawEpisodeData.episode.substring(0, seasonCodeLength),
    episode: rawEpisodeData.episode.substring(episodeCodeLength)
  };
}

async function getAllEpisodes() {
  const episodes = await externalClientProxy.getAllEpisodes();
  return episodes.map(parseRawEpisode);
}

module.exports = {
  getAllEpisodes,
};
