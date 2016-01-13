Parse.initialize("nhFykJoUL5INlggaBWAYf99p7xeu06bOuyhc4iSx", "8xjV4an8FK3OngCErKac7l3OlZntb4w1NtDfNtVZ");
//var Buy = Parse.Object.extend("Buy");
console.log("initialized");

console.log();

function checkLogin(){
  if(Parse.User.current()){
    //console.log("Logged in! "+Parse.User.current().get("username"));
    $("#current-user").html("User: " + Parse.User.current().get("username"));
  } else{
    $("#current-user").html("Not logged in");
  }
}
checkLogin();

$("#logout").click(function(event){
  Parse.User.logOut();
  checkLogin();
});

$("#login").submit(function(event) {
  console.log("login CLICKED");
  event.preventDefault();
  var name = $("#login-name").val();
  var password = $("#login-password").val();

  Parse.User.logIn(name, password, {
    success: function(user) {
      console.log("LogIn success", user);
      checkLogin();
    },
    error: function(user, error) {
      console.log("Login error", error.message);
    }
  });
});

$("#signup").submit(function(event) {
  console.log("SIGNUP CLICKED");
  event.preventDefault();
  var name = $("#signup-name").val();
  var password = $("#signup-password").val();

  var user = new Parse.User();
  user.set("username", name);
  user.set("password", password);
  user.signUp(null, {
    success: function(user) {
      console.log("Login success", user);
      checkLogin();
    },
    error: function(user, error) {
      console.log("signup error", error.message);
    }
  });
});
