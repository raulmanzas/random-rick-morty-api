const httpClient = require('./httpClient');
const environment = require('../../../config/environment');

const episodesEndpoint = '/episode';

async function getAllEpisodes() {
  const client = httpClient.buildClient(environment.externalApiBaseUrl);
  const response = await client.get(episodesEndpoint);
  return response.data.results.map((episode) => ({
    id: episode.id,
    title: episode.name,
    episode: episode.episode
  }));
}

module.exports = {
  getAllEpisodes
};
