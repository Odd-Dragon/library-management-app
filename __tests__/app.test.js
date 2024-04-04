const request = require('supertest');
const app = require('../app');

let server;

beforeAll(() => {
  server = app.listen(8080);
});

afterAll((done) => {
  server.close(done);
});

test('origin is 8080', async () => {
  const response = await request(app).get('/');
  expect(response.statusCode).toBe(200);
});