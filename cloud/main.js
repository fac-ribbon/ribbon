// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
// console.log("--------->>>>>>>>>im in main.js");
var Stripe = require('cloud/node_modules/stripe/lib/stripe.js');
Stripe.initialize('sk_test_1vv56eBruuqP9YPX5avhlK8o');

Parse.Cloud.define("charge", function(request, response) {
//  if (request === "undefined")
   console.log("--------->>>>>>>>>in function charge");
  //console.log(request);

  var stripeToken = request.params.token;
  console.log(stripeToken);
  var charge = Stripe.charges.create({
    amount: 20, // $10 expressed in cents
    currency: "gbp",
    card: stripeToken // the token id should be sent from the client
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      console.log("card declined", err);
    } else {
      console.log("Cloud Success!", charge);
    }
  });
});
