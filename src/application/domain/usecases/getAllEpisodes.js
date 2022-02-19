const externalClientProxy = require('../proxies/externalApiProxy');
const episode = require('../episode');

async function getAllEpisodes() {
  const episodes = await externalClientProxy.getAllEpisodes();
  return episodes.map(episode.parseRawEpisode);
}

module.exports = {
  getAllEpisodes,
};
