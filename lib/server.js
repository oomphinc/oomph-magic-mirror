/**
 * Created by jonclark on 10/23/15.
 */
var Http = require('http');
var Router = require('router');
var path = require('path');
var fs = require('fs');

var server;
var router;

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

router = new Router();

server = Http.createServer(function (request, response) {
  var lookup = path.basename(decodeURI(request.url)) || 'video.html',
    f = 'content/' + lookup;
  fs.exists(f, function (exists) { //path.exists for Node 0.6 and below
    if (exists) {
      fs.readFile(f, function (err, data) {
        if (err) {response.writeHead(500); response.end('Server Error!'); return; }
        var headers = {'Content-type': mimeTypes[path.extname(lookup)]};
        response.writeHead(200, headers);
        response.end(data);
      });
      return;
    }
    response.writeHead(404); //no such file found!
    response.end('Page Not Found!');
  });

}).listen(8080);

var counter = 0,
    messages = {};

function createMessage( request, response ) {
  var id = counter += 1;
  console.log( 'Create message', id );
  response.writeHead( 201, {
    'Content-Type': 'text/plain'
  });
  response.end( 'Message ' + id );
}

router.post( '/message', createMessage );

server.listen( 8080, function() {
  console.log( 'Listening on port 8080' );
});
