const responseMapper = require('../mappers/responseMapper');
const useCase = require('../../../domain/usecases/getAllEpisodes');

async function listAllEpisodes(_, res) {
  const episodes = await useCase.getAllEpisodes();
  return res.status(200).json(responseMapper.mapResponse(episodes));
}

module.exports = {
  get: listAllEpisodes
};
