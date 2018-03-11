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
              bidFee /= 100
              askFee /= 100
              var profit = bid - ask;
              var profitPercent = (((bid - (bid * bidFee)) - (ask + (ask * askFee))) / (ask + (ask * askFee))) * 100;
              profitPercent = profitPercent.toFixed(4);

              //calculate minimum volume to break even with askExchange's XRP withdrawal fees
              // n is amount of initial secondard (non-ripple) currency like BTC, ETH, USDT, ...
              // beforeBidFee = ( ( ( n * (1/ask) ) - ( askFee * (n*1/ask) ) - exchangeInfo[askExchange]["XRPwithdraw"] ) * bid )
              // final = beforeBidFee - bidFee * beforeBidFee
              // so if final is to be profitable it must be higher than n, the initial non-xrp currency put into the trade
              // simplified: n = (bid (bidFee - 1) (ask * withdrawalFee + (askFee - 1)n)) / a
              // ... algebra, using a = ask, b = bid, f = askFee,, g = bidFee, w = withdraw:
              // na = abgw - abw + bfgn - bfn - bgn + bn
              // abw - abgw = bfgn + bn - bfn - bgn - na
              // abw - abgw = n (bfg + b - bf - bg - a)
              // n = (abw - abgw) / (bfg + b - bf - bg - a)
              // ....
              // n = ab(g-1)w / (a + b(-gf + f + g - 1)) if a + b(f + g) != bfg + b
              // var minXRPVolume = exchangeInfo[askExchange]["XRPwithdraw"] / (profitPercent / 100.00) //old wrong min volume
              // var minOtherVolume = minXRPVolume * ask;
              var minOtherVolume = 0.000000;
              if((ask + bid * (askFee+bidFee)) != ((bid * askFee * bidFee) + bid)){
                minOtherVolume = (ask * bid * (bidFee - 1.00) * exchangeInfo[askExchange]["XRPwithdraw"])
                                / (ask + bid * ((-1 * bidFee * askFee) + askFee + bidFee - 1.00));
              }
              var minXRPVolume = minOtherVolume / ask;
              minXRPVolume = minXRPVolume.toFixed(6);
              if (pair.slice(3) === "USD" || pair.slice(3) === "USDT") {
                minOtherVolume = minOtherVolume.toFixed(2);
              } else {
                minOtherVolume = minOtherVolume.toFixed(6);
              }
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
                  "profit": profitPercent,
                  "minXRPVolume": minXRPVolume,
                  "minOtherVolume": minOtherVolume
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
