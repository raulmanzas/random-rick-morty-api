function mapResponse(responseData, message = '') {
  const response = {
    timestamp: Date.now(),
    message,
    data: responseData ?? {}
  };
  return response;
}

module.exports = {
  mapResponse
};
