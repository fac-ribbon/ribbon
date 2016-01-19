var products = (function() {

  var Products = Parse.Object.extend("gifts");
  var query = new Parse.Query(Products);

  var createProductHtml = function(products) {
    return products.map(function(product, index){
      var attr = product.attributes;
      var html;
      index === 0 ? html = "<a class='item active imgDefault' href='payment.html?productId=" + product.id + "'><div>" : html = "<a class='item' href='payment.html?productId=" + product.id + "'><div>";
      html += "<img class='imgDefault' src=" + attr.imgurl + " alt=" + attr.giftName + "></img>";
      html += "<div class='carousel-caption'><h2 class='gift-title'>";
      html += attr.giftName + "</br>" + formatPrice(attr.PricePence);
      html += "</h2></div>";
      html += "</div></a>";
      return html;
    }).join('');
  };

  var buyItem = function(event) {
    var Buy = Parse.Object.extend("Buy");
    var buy = new Buy();
    var target = event.currentTarget;
    var productName = target.getElementsByClassName('gift-title')[0].innerHTML;
    buy.set("gift", productName);
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
  document.getElementById('products').innerHTML = html;
  products.attachBuyEvents();
  $('#products-carousel').carousel({
    interval: false
  });
});
