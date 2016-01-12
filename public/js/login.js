Parse.initialize("nhFykJoUL5INlggaBWAYf99p7xeu06bOuyhc4iSx", "8xjV4an8FK3OngCErKac7l3OlZntb4w1NtDfNtVZ");
//var Buy = Parse.Object.extend("Buy");
console.log("initialized");

var User = Parse.Object.extend('User');
var query = new Parse.Query(User);

$("#email").submit(function(event) {
  //validate username
  console.log("login CLICKED");
  event.preventDefault();
  var name = $("#login-email").val();
  console.log(name);
  // Parse.cloud
  Parse.Cloud.run("emailExists", {username: name}).then(function(exists) {
    console.log("user exists:", exists);
  });
  $("form").toggleClass("hidden");

    // var password = $("#login-password").val();
    //
    // Parse.User.logIn(name, password, {
    //   success: function(user) {
    //     console.log("LogIn success", user);
    //   },
    //   error: function(user, error) {
    //     console.log("Login error", error.message);
    //   }
    // });
});
