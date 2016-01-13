// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
<<<<<<< HEAD
// console.log("--------->>>>>>>>>im in main.js");
// var Stripe = require('cloud/node_modules/stripe/lib/stripe.js');
// Stripe.initialize('sk_test_1vv56eBruuqP9YPX5avhlK8o');
//
// Parse.Cloud.define("charge", function(request, response) {
// //  if (request === "undefined")
//    console.log("--------->>>>>>>>>in function charge");
//   //console.log(request);
//
//   var stripeToken = request.params.token;
//   console.log(stripeToken);
//   var charge = Stripe.charges.create({
//     amount: 20, // $10 expressed in cents
//     currency: "gbp",
//     card: stripeToken // the token id should be sent from the client
//   }, function(err, charge) {
//     if (err && err.type === 'StripeCardError') {
//       console.log("card declined", err);
//     } else {
//       console.log("Cloud Success!", charge);
//     }
//   });
// =======
Parse.Cloud.define("emailExists", function(request, response) {
  console.log("cloud code emailExists is running");
  // var acl = // create with master key
  var User = Parse.Object.extend("User");
  // var user = new User()
  // user.setALC(alc);
  var query = new Parse.Query(User);
  query.find({
    useMasterKey:true,
    success: function(userData) {
      var usernames = userData.map(function(user) {
        return user.attributes.username;
      });

      console.log("usernames");
      console.log(usernames);

      response.success(usernames.indexOf(request.params.username) !== -1);
    },
    error: function(error) {
      response.error(error);
      console.log("emailExists:", error);
    }
  });
});

Parse.Cloud.beforeSave(Parse.User, function(request, response) {
    var acl = new Parse.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    request.object.setACL(acl);
    response.success();
});
