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
      // var paymentData = JSON.parse(body);
      // console.log("In pay endpoint");
      // console.log('raw request', body);
      // console.log('raw request parsed', paymentData);
      // console.log('url attribs', urlData.search);
      paymentData.amount = urlData.search.split('=')[1];
      var charge = chargeObj(paymentData);
      console.log(charge);
      stripe.charges.create(charge, function(err, charge) {
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
