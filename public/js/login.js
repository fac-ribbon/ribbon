Parse.initialize("nhFykJoUL5INlggaBWAYf99p7xeu06bOuyhc4iSx", "8xjV4an8FK3OngCErKac7l3OlZntb4w1NtDfNtVZ");
//var Buy = Parse.Object.extend("Buy");
console.log("initialized");

var User = Parse.Object.extend('User');
var query = new Parse.Query(User);

$("#email").submit(function(event) {
  //validate username
  console.log("login CLICKED");
  event.preventDefault();

  name = $("#login-email").val();
  console.log(name);
  // Parse.cloud
  Parse.Cloud.run("emailExists", {username: name}).then(function(exists) {
    console.log("user exists:", exists);
    if (exists === true) {
      $("form").toggleClass("hidden");
    }
    else {
      $("#login-email-p")[0].innerHTML = "Incorrect. Try again or <a href='../index.html'>Sign Up!</a>";
    }
  });


});

$("#pin").submit(function(event) {
  console.log('pin submit');
  event.preventDefault();
  var password = $("#login-pin").val();
  Parse.User.logIn(name, password, {
    success: function(user) {
      console.log("LogIn success", user);
      window.location.assign("../html/products.html");
    },
    error: function(user, error) {
      console.log("Login error", error.message);
      $("#login-password-p")[0].innerHTML = "Incorrect";
    }
  });
});
