const request = require('supertest');
const app = require('../lib/app');

describe('application routes', () => {
  it('returns the index page with a welcom header', () => {
    return request(app)
      .get('/index.html')
      .then(res => {
        expect(res.text).toEqual(expect.stringContaining('<h1>Welcome</h1>'));
      });
  });

  it('returns the index page with a welcom header when there is an empty path', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.text).toEqual(expect.stringContaining('<h1>Welcome</h1>'));
      });
  });
});
