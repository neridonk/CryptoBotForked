var request = require('request');

module.exports = {

  addData: function (action, price, symbol, rate) {

    var myJSONObject = { action: action, price: price, symbol: symbol, rate: rate };
    request({
      url: "http://nokol.net/tradebot/addTrade.php",
      method: "POST",
      json: true,  
      body: myJSONObject
    }, function (error, response, body) {
      console.log(response);
    });
  }


}
