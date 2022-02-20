const externalApiClient = require('../../adapters/rick-morty-external-api/externalClient');

module.exports = {
  getAllEpisodes: externalApiClient.getAllEpisodes,
  getEpisodeById: externalApiClient.getEpisodeById,
  getNumberOfEpisodes: externalApiClient.getNumberOfEpisodes
};
