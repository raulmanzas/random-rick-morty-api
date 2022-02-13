const responseMapper = require('../mappers/responseMapper');
const errorMapper = require('../mappers/errorMapper');
const useCase = require('../../../domain/usecases/getAllEpisodes');
const logger = require('../../../../config/logger');

async function listAllEpisodes(_, res) {
  try {
    const episodes = await useCase.getAllEpisodes();
    return res.status(200).json(responseMapper.mapResponse(episodes));
  } catch (error) {
    logger.error('Unknown error while listing all episodes: ', { error });
    return res.status(500).json(errorMapper.mapError());
  }
}

module.exports = {
  get: listAllEpisodes
};
