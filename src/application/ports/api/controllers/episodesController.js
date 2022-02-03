function listAllEpisodes(_, res) {
  const mockResponse = [
    {
      name: 'Pilot',
      season: 'S01',
      episode: 'E01'
    }
  ];
  return res.status(200).json(mockResponse);
}

module.exports = {
  get: listAllEpisodes
};
