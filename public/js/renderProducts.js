var products = (function() {

  var Products = Parse.Object.extend("gifts");
  var query = new Parse.Query(Products);

  var createProductHtml = function(products) {
    return products.map(function(product){
      var attr = product.attributes;
      var html = "<div class='product'>";
      html += "<h2 class='gift-title'>" + attr.giftName + "</h2>";
      html += "<img src='" + attr.imgurl + "'></img>";
      html += "</div>";
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
  document.getElementById('products').innerHTML = html;
  products.attachBuyEvents();
});

//logout
function checkLogin(){
  if(Parse.User.current()){
    //console.log("Logged in! "+Parse.User.current().get("username"));
    $("#current-user").html("User: " + Parse.User.current().get("username"));
  } else{
    $("#current-user").html("Not logged in");
  }
}

$("#logout").click(function(event){
  Parse.User.logOut();
  checkLogin();
  window.location.assign("../index.html");
});
