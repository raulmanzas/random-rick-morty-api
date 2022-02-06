const httpClient = require('./httpClient');

const EXTERNAL_API_BASE_URL = 'https://rickandmortyapi.com/api';
const episodesEndpoint = `${EXTERNAL_API_BASE_URL}/episodes`;
const client = httpClient.buildClient(EXTERNAL_API_BASE_URL);

async function getAllEpisodes() {
  const response = await client.get(episodesEndpoint);
  return response.data;
}

module.exports = {
  getAllEpisodes
};
