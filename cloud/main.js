
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


function get_ref_code(callback){

  var refCode = Parse.Object.extend("refCode");
  var query = new Parse.Query(refCode);
  console.log("*");
  query.find({
    useMasterKey:true,
    success: function(results) {
      var refName = results[0].get('refName');
      callback(refName);
    },
    error: function(error) {
      console.log("refCode error:", error);
      response.error(error);
    }
  });
}

Parse.Cloud.beforeSave(Parse.User, function(request, response) {
  // var refCode = "testref";
  // if (request.params.refCode === refCode) {


  get_ref_code(function(secret_refcode){
    if (request.object.get('refCode') !== secret_refcode) {
        response.error(error);
    } else {
      console.log(request);
        var acl = new Parse.ACL();
        acl.setPublicReadAccess(false);
        acl.setPublicWriteAccess(false);
        request.object.setACL(acl);
        response.success();
      }
    });


    // } else {
    //   // no not create user
    // }

});
