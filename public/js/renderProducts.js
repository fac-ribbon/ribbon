var products = (function() {

  var Products = Parse.Object.extend("gifts");
  var query = new Parse.Query(Products);

  var createProductHtml = function(products) {
    return products.map(function(product){
      var attr = product.attributes;
      var html = "<div class='item'>";
      html += "<img src=" + attr.imgurl + " alt=" + attr.giftName + "></img>";
      html += "<div class='banner'><div class='carousel-caption'> <h2 class='gift-title'>" + attr.giftName + "</h2>";
      html += "</div></div></div>";
      return html;
    }).join('');
  };

  var buyItem = function(event) {
    var Buy = Parse.Object.extend("Buy");
    var buy = new Buy();

    var target = event.currentTarget;

    var productName = target.getElementsByClassName('gift-title')[0].innerHTML;

    buy.set("gift", productName);
    // newBuy.set("message", "I want this to arrive at 6th July 2015");
    buy.save({
      success: function() {
        console.log(productName + " successfully ordered");
      },
      error: function() {
        console.log("error buying " + productName, error.message);
      }
    });
  };

  var attachBuyEvents = function() {
    var productsDiv = document.getElementById('products');
    var products = productsDiv.getElementsByClassName('product');
    [].map.call(products, function (product) {
      product.addEventListener('click', buyItem);
    });
  };

  var renderProducts = function renderProducts(callback) {
    query.find({
      success: function(results) {
        callback(createProductHtml(results));
        // results is an array of Parse.Object.
      },

      error: function(error) {
        // error is an instance of Parse.Error.
      }
    });
  };

  return {
    renderProducts: renderProducts,
    attachBuyEvents: attachBuyEvents
  };
})();

products.renderProducts(function(html) {
  console.log(html);
  // document.getElementById('products').innerHTML =  "<div class='item active'><img src='http://3.bp.blogspot.com/-8F28qIv-1pE/VBuLPdur9JI/AAAAAAAAAPc/F6ikaZDWHzo/s1600/kata%2Bkata%2Bcemburu.jpg'></div>" + html;
  products.attachBuyEvents();
});

//logout
function checkLogin(){
  if(Parse.User.current()){
    //console.log("Logged in! "+Parse.User.current().get("username"));
    $("#current-user").html("User: " + Parse.User.current().get("username"));
  } else{
    // window.location.assign("../index.html");
    $("#current-user").html("Not logged in you fool");
  }
}

$("#logout").click(function(event){
  Parse.User.logOut();
  // checkLogin();
  window.location.assign("../index.html");
});
