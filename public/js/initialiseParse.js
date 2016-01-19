(function initialise(){

  Parse.initialize("nhFykJoUL5INlggaBWAYf99p7xeu06bOuyhc4iSx", "8xjV4an8FK3OngCErKac7l3OlZntb4w1NtDfNtVZ");

  if(Parse.User.current()){
    //console.log("Logged in! "+Parse.User.current().get("username"));
    $("#current-user").html("User: " + Parse.User.current().get("username"))
  } else{
    $("#current-user").html("Not logged in");
    window.location.assign("../index.html");
  }
})();

$("#logout").click(function(event){
  Parse.User.logOut();
  window.location.assign("../index.html");
});
