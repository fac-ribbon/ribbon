var formatPrice = function(pence) {
  var penceNum = parseInt(pence, 10);
  var pounds = Math.floor(pence/100);
  var penceNum = penceNum - pounds*100;
  penceStr = penceNum.toString();
  penceStr = penceStr.length === 2 ? penceStr :
    penceStr.length === 1 ? "0" + penceStr : "00";
  return "£" + pounds.toString() + "." + penceStr;
}
