const fs = require('fs');
const { parse } = require('url');
const { join, sep } = require('path');
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

  const pathArr = pathname.split(sep);
  let dirPath;
  let fileName;

  if(pathArr.indexOf('..') !== -1) {
    dirPath = '';
    fileName = 'not-found.html';
    res.statusCode = 404;
  } else if(pathArr.length > 1) {
    dirPath = join(...pathArr.slice(0, -1));
    fileName = pathArr[pathArr.length - 1];
  } else {
    dirPath = '';
    fileName = pathname;
  }

  fs.readdir(join(__dirname, '..', 'public', dirPath), (err, files) => {
    if(files.indexOf(fileName) === -1) {
      res.statusCode = 404;
      fileName = 'not-found.html';
      dirPath = '';
    }

    fs.readFile(join(__dirname, '..', 'public', dirPath, fileName), (err, data) => {
      res.end(data);
    });
  });
   
});

module.exports = app;
