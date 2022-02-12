const httpClient = require('./httpClient');

const EXTERNAL_API_BASE_URL = 'http://rickandmortyapi.com/api';
const episodesEndpoint = '/episode';

async function getAllEpisodes() {
  const client = httpClient.buildClient(EXTERNAL_API_BASE_URL);
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
