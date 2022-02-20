const externalClientProxy = require('../proxies/externalApiProxy');
const episode = require('../episode');

function getRandomId(totalEpisodes) {
  return Math.floor(Math.random() * (totalEpisodes - 1));
}

async function getRandomEpisode() {
  const totalNumberOfEpisodes = await externalClientProxy.getNumberOfEpisodes();
  const randomEpisodeId = getRandomId(totalNumberOfEpisodes);
  const selectedEpisode = await externalClientProxy.getEpisodeById(randomEpisodeId);
  return episode.parseRawEpisode(selectedEpisode);
}

module.exports = {
  getRandomEpisode
};
