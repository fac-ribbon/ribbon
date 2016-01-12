var http = require('http');

var stripe = require('stripe')("sk_test_1vv56eBruuqP9YPX5avhlK8o");

var port = process.env.PORT || 2000;

var chargeObj = paymentData => ({
  amount: 20, // paymentData.amount
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
    getBody(request, function(body) {
      var paymentData = JSON.parse(body)
      stripe.charges.create(chargeObj(paymentData), function(err, charge) {
        console.log(err);
        console.log(charge);
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
