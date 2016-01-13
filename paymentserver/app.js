var http = require('http');

var stripe = require('stripe')("sk_test_1vv56eBruuqP9YPX5avhlK8o");

var querystring = require('querystring');
var url = require('url');

var port = process.env.PORT || 2000;

var chargeObj = paymentData => ({
  amount: 40, // paymentData.amount
  currency: "gbp",
  source: paymentData.token,
  description: "example charge" //paymentData.example
});

var server = http.createServer(function(request, response) {
  response.setHeader('Access-Control-Allow-Origin', 'https://ribbonmvp.parseapp.com');
  // response.setHeader('Access-Control-Allow-Origin', 'https://ribbonmvp.parseapp.com/loginPage.html');
  console.log(request.url);
  if (request.url === '/') {
    response.end('hello, world');
  } else if (request.url === "/pay" && request.method === 'POST') {
    var urlData = url.parse(request.url, true);
    getBody(request, function(body) {
      var paymentData = querystring.parse(body);
      // var paymentData = JSON.parse(body);
      console.log("In pay endpoint");
      console.log('raw request', body);
      console.log('raw request parsed', paymentData);
      console.log('url attribs', urlData.search);
      stripe.charges.create(chargeObj(paymentData), function(err, charge) {
        console.log(err);
        console.log(charge);
        response.writeHead(302, {'Location': 'https://ribbonmvp.parseapp.com'})
        if (err && err.type === 'StripeCardError') {
          response.end("error");
        } else {
          response.end("success");
        }
      });
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
