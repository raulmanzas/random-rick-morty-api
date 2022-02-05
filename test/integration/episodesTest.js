const request = require('supertest');
const api = require('../../src/application/ports/api/api');

const app = api.getApplication();

describe('Episodes endpoint', () => {
  let server = null;
  let agent = null;

  before((done) => {
    server = app.listen(done);
    agent = request(server);
  });

  it('should return a list of all available episodes', () => {
    agent
      .get('/api/v1/episodes')
      .expect(200);
  });

  after((done) => {
    server.close(done);
  });
});
