//file for /time related routes
const express = require('express');
const router = express.Router();
var axios = require('axios');

//object to store APIURLs and paths to prices within JSON response
var exchangeInfo = require("../exchangeInfo.json");

//function for comoparing prices and generating suggestions
function generateSuggestions(currentPrices) {
  var xrpusdlist = [];
  for (var exchange1 in currentPrices) {
    for (var exchange2 in currentPrices) {
      var xrpusd1 = currentPrices[exchange1]["XRPUSD"];
      var xrpusd2 = currentPrices[exchange2]["XRPUSD"];
      if (xrpusd1 && xrpusd2 && (exchange1 != exchange2)) {           
        if (xrpusd1.prices && xrpusd2.prices) {
          var bid = xrpusd1.prices["bid"];
          var ask = xrpusd2.prices["ask"];
          var profit = bid - ask;
        if (profit > 0.0) {
          xrpusdlist.push({
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
    console.log("xrpusd: ");
    console.log(xrpusdlist);
}

router.get('/', function (req, res) {
    res.json("/suggestions endpoint");
});

module.exports = {
    router:router,
    generateSuggestions:generateSuggestions
};
