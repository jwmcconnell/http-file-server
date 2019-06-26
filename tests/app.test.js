const request = require('supertest');
const app = require('../lib/app');

describe('application routes', () => {
  it('returns a list of dogs', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.text).toEqual(expect.stringContaining('<h1>Welcome</h1>'));
      });
  });
});
