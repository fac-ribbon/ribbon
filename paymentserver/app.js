var http = require('http');

var port = process.env.PORT || 2000

var server = http.createServer(function(request, response) {
  response.setHeader('Access-Control-Allow-Origin', 'https://ribbonmvp.parseapp.com');
  console.log(request.url);
  if (request.url === '/') {
    response.end('hello, world');
  } else if (request.url === "/pay" && request.method === 'POST') {
    getBody(request, function(body) {
      console.log(JSON.parse(body));
      response.end(JSON.stringify(body));
    });
    // response.end("welcome to pay endpoint");
  } else {
    response.end("404!");
  }
});

var getBody = function(request, callback) {
  var body = '';
  request.on('data', chunk => body += chunk);
  request.on('end', () => callback(body));
};

server.listen(port, function() {
  console.log("listening on", port);
});
