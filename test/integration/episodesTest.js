const request = require('supertest');
const { assert } = require('chai');

const api = require('../../src/application/ports/api/api');

const app = api.getApplication();

describe('Episodes endpoint', () => {
  let server = null;
  let agent = null;

  before((done) => {
    server = app.listen(done);
    agent = request(server);
  });

  it('should return a list of all available episodes', async () => {
    const response = await agent.get('/api/v1/episodes');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.length, 3);
  });

  after((done) => {
    server.close(done);
  });
});
