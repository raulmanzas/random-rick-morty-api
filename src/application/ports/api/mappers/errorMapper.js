function mapError(error) {
  const response = {
    timestamp: Date.now(),
    message: error ? error.message : 'Unknown error happened',
    data: {}
  };
  return response;
}

module.exports = {
  mapError
};
