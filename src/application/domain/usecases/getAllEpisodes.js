const externalClientProxy = require('../proxies/externalApiProxy');

function parseRawEpisode(rawEpisodeData) {
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
