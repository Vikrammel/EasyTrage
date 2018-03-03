//file for /time related routes
const express = require('express');
const router = express.Router();
var axios = require('axios');

//object to store APIURLs and paths to prices within JSON response
var exchangeInfo = require("../exchangeInfo.json");

//list of profitable trades
var profitList = [];

//function for comparing prices and generating suggestions
function generateSuggestions(currentPrices) {
  var newProfitList = []; //clear list before generating suggestions again
  var pairs = ["XRPBTC", "XRPUSDT", "XRPUSD", "XRPETH"];
  for (i in pairs) {
    var pair = pairs[i];
    for (var bidExchange in currentPrices) {
      for (var askExchange in currentPrices) {
        if (exchangeInfo[bidExchange] && exchangeInfo[askExchange] &&
            exchangeInfo[bidExchange]["XRPwithdraw"] && exchangeInfo[askExchange]["XRPwithdraw"]) {
          var bidPrice = currentPrices[bidExchange][pair];
          var askPrice = currentPrices[askExchange][pair];
          if (bidPrice && askPrice && (bidExchange != askExchange)) {
            if (bidPrice.prices && askPrice.prices) {
              var bid = bidPrice.prices["bid"];
              var ask = askPrice.prices["ask"];
              var bidFee = exchangeInfo[bidExchange].taker;
              var askFee = exchangeInfo[askExchange].taker;
              //convert to decimal for math
              bidFee /=  100
              askFee /= 100
              var profit = bid - ask;
              var profitPercent = (( (bid - (bid*bidFee)) - (ask + (ask*askFee)) ) / (ask + (ask*askFee))) * 100;
              profitPercent = profitPercent.toFixed(4);
              if (profitPercent > 0.0) {
                newProfitList.push({
                  "pair": pair,
                  "bid": {
                    "exchange": bidExchange,
                    "price": bid,
                    "taker fee": bidFee * 100,
                    "withdraw fee": {
                      "XRP": exchangeInfo[bidExchange]["XRPwithdraw"],
                      "BTC": exchangeInfo[bidExchange]["BTCwithdraw"],
                      "ETH": exchangeInfo[bidExchange]["ETHwithdraw"],
                      "USDT": exchangeInfo[bidExchange]["USDTwithdraw"]
                    } 
                  },
                  "ask": {
                    "exchange": askExchange,
                    "price": ask,
                    "taker fee": askFee * 100,
                    "withdraw fee": {
                      "XRP": exchangeInfo[askExchange]["XRPwithdraw"],
                      "BTC": exchangeInfo[askExchange]["BTCwithdraw"],
                      "ETH": exchangeInfo[askExchange]["ETHwithdraw"],
                      "USDT": exchangeInfo[askExchange]["USDTwithdraw"]
                    }
                  },
                  "profit": profitPercent
                });
              }
            }
          }
        }
      }
    }
  }
  //sorts array by max profit
  newProfitList.sort(function (a, b) { return b.profit - a.profit });
  profitList = newProfitList;


  // console.log("Trade suggestions: ");
  // console.log(profitList);
  return profitList;
}

router.get('/', function (req, res) {
  res.json(profitList);
});

module.exports = {
  router: router,
  generateSuggestions: generateSuggestions
};
