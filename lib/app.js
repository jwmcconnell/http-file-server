const fs = require('fs');
const { join } = require('path');
const { createServer } = require('http');

const app = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  fs.readFile(join(__dirname, '..', 'public', 'index.html'), (err, data) => {
    res.end(data);
  });
});

module.exports = app;
