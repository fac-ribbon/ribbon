(function() {
  $(document).ready(function() {
    var productId = getProductId();

    buildProductDescription(productId, function(html) {
      $("#product-details").html(html);
    });

    $("#pay-button").click(function() {
      saveDeliveryDetails();
      $("#details input").attr('readonly', 'readonly');
      $("#details input").addClass('input-disabled');
      $("#stripeform").removeClass('hidden');
      $("#details-button").removeClass('hidden');
      $("#pay-button").addClass('hidden');
      return false;
    });

    $("#details-button").click(function() {
      saveDeliveryDetails();
      $("#details input").removeAttr('readonly');
      $("#details input").removeClass('input-disabled');
      $("#stripeform").addClass('hidden');
      $("#details-button").addClass('hidden');
      $("#pay-button").removeClass('hidden');
      return false;
    });
  });

  var getProductId = function() {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    return vars.filter(function(elem) {
      return elem.split("=")[0] === "productId";
    })[0].split("=")[1];
  };

  var formatProductData = function(productData) {
    var attribs = productData[0].attributes;
    return {
      id: productData[0].id,
      desc: attribs.GiftDescrip,
      pence: attribs.PricePence,
      name: attribs.giftName,
      url: attribs.imgurl
    };
  };

  var buildProductHTML = function(productData) {
    var html = "<div class='product'>";
    html += "<h2>" + productData.name + "</h2>";
    html += "<h3> " + formatPrice(productData.pence) + "</h3>";
    html += "<p>" + productData.desc + "</p>";
    html += "<img src='" + productData.url + "'></img>";
    return html;
  }

  var buildProductDescription = function(productId, callback) {
    var Gifts = Parse.Object.extend("gifts");
    var query = new Parse.Query(Gifts);
    query.equalTo("objectId", productId);
    query.find({
      success: function(result) {
        var productData = formatProductData(result);
        callback(buildProductHTML(productData))
      },
      error: function(error) {
        callback('ops, something went wrong' + error.message);
      }
    });
  };

    var saveDeliveryDetails = function() {
    var productId = getProductId();
    var action = "https://ribbonpaymentserver.herokuapp.com/pay";
    action += "?" + [].map.call(document
      .getElementById("details")
      .getElementsByTagName('input'),
      function(elem) {
        return elem.name + "=" + elem.value + "&"
      }).join('') + "productId=" + productId + "&email=" + Parse.User.current().get("username");
    $("#stripeform").attr("action", action);
  };
}());
