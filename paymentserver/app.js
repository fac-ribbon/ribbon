var http = require('http');

var stripe = require('stripe')("sk_test_1vv56eBruuqP9YPX5avhlK8o");

var querystring = require('querystring');
var url = require('url');

var port = process.env.PORT || 2000;

var chargeObj = paymentData => ({
  amount: paymentData.amount,
  currency: "gbp",
  source: paymentData.stripeToken,
  description: "example charge" //paymentData.example
});

var server = http.createServer(function(request, response) {
  var urlData = url.parse(request.url, true);
  response.setHeader('Access-Control-Allow-Origin', 'https://ribbonmvp.parseapp.com');
  // response.setHeader('Access-Control-Allow-Origin', 'https://ribbonmvp.parseapp.com/loginPage.html');
  console.log(request.url);
  if (request.url === '/') {
    response.end('hello, world');
  } else if (urlData.pathname === "/pay" && request.method === 'POST') {
    var urlData = url.parse(request.url, true);
    getBody(request, function(body) {
      var paymentData = querystring.parse(body);
      paymentData.amount = urlData.search.split('=')[1];
      var charge = chargeObj(paymentData);
      stripe.charges.create(charge, function(err, charge) {
        if (err && err.type === 'StripeCardError') {
          response.writeHead(302, {'Location': 'https://ribbonmvp.parseapp.com/html/payment-error.html'})
          response.end();
        } else {
          response.writeHead(302, {'Location': 'https://ribbonmvp.parseapp.com/html/payment-success.html'})
          response.end();
        }
      });
    });
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
