Parse.initialize("nhFykJoUL5INlggaBWAYf99p7xeu06bOuyhc4iSx", "8xjV4an8FK3OngCErKac7l3OlZntb4w1NtDfNtVZ");
//var Buy = Parse.Object.extend("Buy");
console.log("initialized");



$("#signup").submit(function(event) {
  console.log("SIGNUP CLICKED");
  event.preventDefault();
  var name = $("#signup-name").val();
  var password = $("#signup-password").val();
  var refCode = $('#signup-refCode').val();


  Parse.Cloud.run("emailExists", {username: name}).then(function(exists) {
    console.log("user exists:", exists);
    if (exists === true) {
      $("#signup-email-p")[0].innerHTML = "Already taken";
    }
    else {
        $("#signup-email-p")[0].innerHTML = "";
    }
  });

  var user = new Parse.User();
  user.set("username", name);
  user.set("password", password);
  user.signUp({refCode: refCode}, {
    success: function(user) {
      console.log("signup success", user);
      window.location.assign("../html/products.html");
    },
    error: function(user, error) {
      if (error.message==="badref") {
        $("#signup-ref-p")[0].innerHTML = "Incorrect";
      }
      else {
          $("#signup-ref-p")[0].innerHTML = "";
      }
      console.log(error);

    }
  });
  return false;
});
