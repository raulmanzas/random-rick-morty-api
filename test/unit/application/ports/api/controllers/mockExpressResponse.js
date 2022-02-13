class MockResponse {
  statusCode = 0;

  jsonResponse = '';

  status(statusCode) {
    this.statusCode = statusCode;
    return this;
  }

  json(jsonResponse) {
    this.jsonResponse = jsonResponse;
    return this;
  }
}

module.exports = MockResponse;
