var http = require('http');

var server = http.createServer(function(request, response) {
  console.log(request.url);
  if (request.url === "/pay" && request.type === 'POST') {
    getBody(request, function(body) {
      console.log(body);
    })
  }
  response.end('hello, world');
});

var getBody = function(request, callback) {
  var body = '';
  request.on('data', chunk => body += chunk);
  request.on('end', () => callback(body));
};

server.listen(2000, function() {
  console.log("listening on 2000");
});
