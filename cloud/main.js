
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("emailExists", function(request, response) {
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
      response.success(usernames.indexOf(request.params.username) !== -1);
    },
    error: function(error) {
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
