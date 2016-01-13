Parse.initialize("nhFykJoUL5INlggaBWAYf99p7xeu06bOuyhc4iSx", "8xjV4an8FK3OngCErKac7l3OlZntb4w1NtDfNtVZ");
//var Buy = Parse.Object.extend("Buy");
console.log("initialized");



$("#signup").submit(function(event) {
  console.log("SIGNUP CLICKED");
  event.preventDefault();
  var name = $("#signup-name").val();
  var password = $("#signup-password").val();
  var refCode = $('#signup-refCode').val();


  Parse.Cloud.run("emailExists", {username: name}).then(function(users) {
    console.log(users);
  });

  var user = new Parse.User();
  user.set("username", name);
  user.set("password", password);
  user.signUp({refCode: refCode}, {
    success: function(user) {
      console.log("Login success", user);
      window.location.assign("../html/products.html");
    },
    error: function(user, error) {
      console.log("signup error", error.message);
    }
  });
  return false;
});
