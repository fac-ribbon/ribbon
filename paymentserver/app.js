var http = require('http');

var port = proccess.env.PORT || 2000

var server = http.createServer(function(request, response) {
  console.log(request.url);
  if (request.url === '/') {
    response.end('hello, world');
  }
  if (request.url === "/pay" && request.type === 'POST') {
    getBody(request, function(body) {
      console.log(body);
    })
  }
  response.end('hello, payment');
});

var getBody = function(request, callback) {
  var body = '';
  request.on('data', chunk => body += chunk);
  request.on('end', () => callback(body));
};

server.listen(port, function() {
  console.log("listening on", port);
});
