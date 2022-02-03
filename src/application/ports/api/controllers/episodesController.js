function listAllEpisodes(_, res) {
  const mockResponse = [
    {
      name: 'Pilot',
      season: 'S01',
      episode: 'E01'
    },
    {
      name: 'Lawnmower Dog',
      season: 'S01',
      episode: 'E02'
    },
    {
      name: 'Anatomy Park',
      season: 'S01',
      episode: 'E03'
    }
  ];
  return res.status(200).json(mockResponse);
}

module.exports = {
  get: listAllEpisodes
};
