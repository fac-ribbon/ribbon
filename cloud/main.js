
Parse.Cloud.define("emailExists", function(request, response) {
  console.log("cloud code emailExists is running");
  var User = Parse.Object.extend("User");
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
