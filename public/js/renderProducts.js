var renderProducts = (function() {
  Parse.initialize("nhFykJoUL5INlggaBWAYf99p7xeu06bOuyhc4iSx", "8xjV4an8FK3OngCErKac7l3OlZntb4w1NtDfNtVZ");
  var Products = Parse.Object.extend("gifts");
  var query = new Parse.Query(Products);

  var createProductHtml = function(products) {
    return products.map(function(product){
      var attr = product.attributes;
      var html = "<div class='product'>";
      html += "<h2>" + attr.giftName + "</h2>";
      html += "<img src='" + attr.imgurl + "'></img>";
      return html;
    }).join('');
  };

  return function renderProducts(callback) {
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
})();

renderProducts(function(html) {
  document.getElementById('products').innerHTML = html;
});
