function listAllEpisodes(_, res) {
  const mockResponse = [
    {
      title: 'Pilot',
      season: 'S01',
      episode: 'E01'
    },
    {
      title: 'Lawnmower Dog',
      season: 'S01',
      episode: 'E02'
    },
    {
      title: 'Anatomy Park',
      season: 'S01',
      episode: 'E03'
    }
  ];
  return res.status(200).json(mockResponse);
}

module.exports = {
  get: listAllEpisodes
};
