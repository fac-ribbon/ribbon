var querystring = require('querystring');
var url = require('url');
var http = require('http');
require('env2')('../config.env');

var stripe = require('stripe')(process.env.STRIPE_KEY);
var Parse = require('parse/node').Parse;
Parse.initialize("nhFykJoUL5INlggaBWAYf99p7xeu06bOuyhc4iSx", "8xjV4an8FK3OngCErKac7l3OlZntb4w1NtDfNtVZ");


var getPrice = function(productId, callback) {
  Parse.Cloud.run("getItemCost", {productId: "4tcI7tbxrV"}).then(function(result) {
    callback(JSON.parse(result)[0]);
  });
};

var buyItem = function(productData, callback) {
  var Buy = Parse.Object.extend('Buy');
  var buy = new Buy();
  buy.set("gift", productData.gift);
  buy.set("saleInfo", productData.saleInfo + "giftName: " + productData.gift);
  // console.log("we need to save: ", productData.saleInfo);
  // newBuy.set("message", "I want this to arrive at 6th July 2015");
  buy.save({
    success: function() {
      callback(true);
    },
    error: function() {
      callback(false);
    }
  });
}

var chargeObj = paymentData => ({
  amount: paymentData.amount,
  currency: "gbp",
  source: paymentData.stripeToken,
  description: "example charge", //paymentData.example
  receipt_email: paymentData.email ;
});

var makePayment = function(paymentData, callbackError, callbackSuccess) {
  getPrice(paymentData.productId, function(productData) {
    paymentData.amount = productData.PricePence;
    paymentData.gift = productData.giftName;
    var chargeData = chargeObj(paymentData);
    stripe.charges.create(chargeData, function(err, charge) {
      // if (err) console.log(err);
      if (err) {
        callbackError();
        } else {
          buyItem(paymentData, function(success) {
            if (!success) {
                throw new Error('This should not happen, payment with token '+ chargeData.source +'failed');
            } else {
              callbackSuccess();
            }
          }
        );
      }
    });
  });
}

// var testUrl = "https://www.paymentserver.herokuapp.com/pay?data1=3&data2=5";
var getQueryData = function(requestUrl) {
    return querystring.parse(url.parse(requestUrl, true).search.slice(1));
};

formatQueryData = function(queryData) {
  return Object.keys(queryData).map(function(key){
    return key + ": " + queryData[key] + "\n";
  }).join('');
};

// console.log(formatQueryData(getQueryData(testUrl)));

var port = process.env.PORT || 2000;

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
      var queryData = getQueryData(request.url);
      var paymentData = querystring.parse(body);
      paymentData.productId = queryData.productId;
      paymentData.email = queryData.email;
      paymentData.saleInfo = formatQueryData(queryData);
      makePayment(paymentData, function() {
        response.writeHead(302, {'Location': 'https://ribbonmvp.parseapp.com/html/payment-error.html'})
        response.end();
      }, function() {
        response.writeHead(302, {'Location': 'https://ribbonmvp.parseapp.com/html/payment-success.html'})
        response.end();
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
