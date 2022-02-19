const httpClient = require('./httpClient');
const environment = require('../../../config/environment');

const episodesEndpoint = '/episode';

function getClient() {
  return httpClient.buildClient(environment.externalApiBaseUrl);
}

function mapEpisodeResponse(episodeResponse) {
  return {
    id: episodeResponse.id,
    title: episodeResponse.name,
    episode: episodeResponse.episode
  };
}

async function getAllEpisodes() {
  const client = getClient();
  const response = await client.get(episodesEndpoint);
  return response.data.results.map(mapEpisodeResponse);
}

function validateResponse(response) {
  if (response.status === httpClient.responseStatus.HTTP_NOT_FOUND) {
    throw new Error('Requested episode could not be found');
  }
  if (response.status !== httpClient.responseStatus.HTTP_SUCCESS) {
    throw new Error('Unexpected error happened while fetching episode data');
  }
}

async function getEpisodeById(id) {
  if (!id) {
    throw new Error('The episode id must be supplied in order to fetch its data');
  }
  const client = getClient();
  const response = await client.get(`${episodesEndpoint}/${id}`);
  validateResponse(response);
  return mapEpisodeResponse(response.data.results);
}

module.exports = {
  getAllEpisodes,
  getEpisodeById
};
