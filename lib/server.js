/**
 * Created by jonclark on 10/23/15.
 */
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
  '.js' : 'text/javascript',
  '.html': 'text/html',
  '.css' : 'text/css',
  '.eot' : 'font/opentype',
  '.svg' : 'font/opentype',
  '.ttf' : 'font/opentype',
  '.woff' : 'application/font-woff',
  '.woff2' : 'application/font-woff',
};

var pages = [
  {id: '1', route: '', output: 'Woohoo!'},
  {id: '2', route: 'about', output: 'A Simple routing with Node example'},
  {id: '3', route: 'another page', output: function () {return 'Here\'s' + this.route; }},
];

http.createServer(function (request, response) {
  var id = url.parse(decodedURI(request.url), true).query.id;
  if (id) {
    pages.forEach(function (page) {
      if (page.id === id) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(typeof page.output === 'function' ? page.output() : page.output);
      }
    });
  }
  if (!response.finished) {
    response.writeHead(404);
    response.end('Page Not Found');
  }
}).listen(8080);
