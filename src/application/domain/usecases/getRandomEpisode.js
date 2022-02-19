const externalClientProxy = require('../proxies/externalApiProxy');
const episode = require('../episode');

function getRandomId(totalEpisodes) {
  return Math.floor(Math.random() * (totalEpisodes - 1));
}

async function getRandomEpisode() {
  const randomEpisodeId = getRandomId(3);
  const selectedEpisode = await externalClientProxy.getEpisodeById(randomEpisodeId);
  return episode.parseRawEpisode(selectedEpisode);
}

module.exports = {
  getRandomEpisode
};
