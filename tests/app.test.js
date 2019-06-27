const request = require('supertest');
const app = require('../lib/app');

describe('application routes', () => {
  it('returns the index page with a welcome header', () => {
    return request(app)
      .get('/index.html')
      .then(res => {
        expect(res.text).toEqual(expect.stringContaining('<h1>Welcome</h1>'));
      });
  });

  it('returns the index page with a welcome header when there is an empty path', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.text).toEqual(expect.stringContaining('<h1>Welcome</h1>'));
      });
  });

  it('returns the index page with a welcome header when there is an empty path', () => {
    return request(app)
      .get('/info.html')
      .then(res => {
        expect(res.text).toEqual(expect.stringContaining('<h1>Info</h1>'));
      });
  });

  it('returns a page in a sub directory', () => {
    return request(app)
      .get('/subdir/index.html')
      .then(res => {
        expect(res.text).toEqual(expect.stringContaining('<h1>Sub Index</h1>'));
      });
  });

  it('returns a not found page when trying to go outside of public', () => {
    return request(app)
      .get('/../index.html')
      .then(res => {
        expect(res.text).toEqual(expect.stringContaining('<h1>Not Found</h1>'));
      });
  });

  it('returns a page in a sub directory', () => {
    return request(app)
      .get('/subdir/indafasdex.html')
      .then(res => {
        expect(res.text).toEqual(expect.stringContaining('<h1>Not Found</h1>'));
      });
  });

  it('returns a not found page when the path does not match a file in public', () => {
    return request(app)
      .get('/badpath')
      .then(res => {
        expect(res.text).toEqual(expect.stringContaining('<h1>Not Found</h1>'));
      });
  });
});
