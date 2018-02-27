//file for /time related routes
const express = require('express');
const router = express.Router();
var axios = require('axios');

//object to store APIURLs and paths to prices within JSON response
var exchangeInfo = require("../exchangeInfo.json");

//function for comoparing prices and generating suggestions
function generateSuggestions(currentPrices) {
  var profitlist = [];
  var pairs = ["XRPBTC", "XRPUSDT", "XRPUSD", "XRPETH"];
  for (i in pairs) {
    var pair = pairs[i]; 
    for (var exchange1 in currentPrices) {
      for (var exchange2 in currentPrices) {
        var price1 = currentPrices[exchange1][pair];
        var price2 = currentPrices[exchange2][pair];
        if (price1 && price2 && (exchange1 != exchange2)) {           
          if (price1.prices && price2.prices) {
            var bid = price1.prices["bid"];
            var ask = price1.prices["ask"];
            var profit = bid - ask;
          if (profit > 0.0) {
            profitlist.push({
              "pair": pair,
              "bid": {
                "exchange": exchange1,
                "price": bid
              },
              "ask": {
                "exchange": exchange2,
                "price": ask
              }
            });
          }
          }
        }
      }
    }
  }
    console.log("Trade suggestions: ");
    console.log(profitlist);
    return profitlist;
}

router.get('/', function (req, res) {
    res.json(xrpusdlist);
});

module.exports = {
    router:router,
    generateSuggestions:generateSuggestions
};
