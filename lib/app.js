const fs = require('fs');
const { parse } = require('url');
const { join } = require('path');
const { createServer } = require('http');

const app = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  let { pathname } = parse(req.url);

  if(pathname === '/') {
    pathname = 'index.html';
  } else {
    pathname = pathname.slice(1);
  }

  fs.readdir(join(__dirname, '..', 'public'), (err, files) => {
    if(files.indexOf(pathname) === -1) {
      console.log('not found');
      pathname = 'not-found.html';
    }

    fs.readFile(join(__dirname, '..', 'public', pathname), (err, data) => {
      res.end(data);
    });
  });

});

module.exports = app;
