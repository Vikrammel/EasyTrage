//file for /price related routes
const express = require('express');
const router = express.Router();
var axios = require('axios');

//object to store APIURLs and paths to prices within JSON response
var APIInfo = {
  "chasing-coins":{
    "BTCUSD": ["https://chasing-coins.com/api/v1/std/coin/BTC", "", "", "price"]
  },
  "bittrex":{
    "XRPBTC": ["https://bittrex.com/api/v1.1/public/getticker?market=btc-xrp", 
              "result.Bid", "result.Ask", "result.Last"]
  },
  "bitfinex": {
    "XRPBTC": ["https://api.bitfinex.com/v1/pubticker/XRPBTC", "", "", "last_price"],
    "XRPUSD": ["https://api.bitfinex.com/v1/pubticker/XRPUSD", "", "", "last_price"]
  },
  "bitstamp": {
    "XRPUSD": ["https://www.bitstamp.net/api/v2/ticker/XRPUSD", "", "", ""]
  },
  "coinegg": {
    "XRPBTC": ["https://api.coinegg.com/api/v1/ticker?coin=xrp", "sell", "buy", ""]
  },
  "okex": {
    "XRPBTC": ["https://www.okex.com/api/v1/ticker.do?symbol=xrp_btc", 
              "ticker.sell", "ticker.buy", "ticker.last"]
  },
  "hitbtc": {
    "XRPBTC": ["https://api.hitbtc.com/api/2/public/ticker/XRPBTC", "", "", ""],
    "XRPUSDT": ["https://api.hitbtc.com/api/2/public/ticker/XRPUSDT", "", "", ""],
    "XRPETH": ["https://api.hitbtc.com/api/2/public/ticker/XRPETH", "", "", ""]
  }
}

router.get('/:pair/:exchange/:bidask?', function(req, res) {

  //function to standardize calls to api so code is more readable
  function standardAPITicker(APIURL, bidPath = '', askPath = '', lastPath = ''){
    axios.get(APIURL)  
    .then( (APIres) => {
      var status = APIres.status;

      if (status == 200) {

        var price;

        //get correct price based of request params
        if (req.params.bidask == 'bid'){
          if(bidPath.length > 0) {
            //non-standard path
            price = APIres.data;
            var pathArr = bidPath.split('.');
            for (var pathNode in pathArr){ //pathNode = index of JSON node in pathArr
              price = price[pathArr[pathNode]];
            }
          } else price = APIres.data.bid; //standard path in JSON response

        } else if (req.params.bidask == 'ask') {
          if(askPath.length > 0) {
            //non-standard path
            price = APIres.data;
            var pathArr = askPath.split('.');
            for (var pathNode in pathArr){ //pathNode = index of JSON node in pathArr
              price = price[pathArr[pathNode]];
            }
          } else price = APIres.data.ask; //standard path in JSON response
        } else {
          if(lastPath.length > 0) {
            //non-standard path
            price = APIres.data;
            var pathArr = lastPath.split('.');
            for (var pathNode in pathArr){ //pathNode = index of JSON node in pathArr
              price = price[pathArr[pathNode]];
            }
          } else price = APIres.data.last; //standard path in JSON response
        }

        return res.json("{APIStatusCode: '" + status + "', price: '" + price + "' }");
      }
      return res.json("{APIStatusCode: '" + status + "', message: 'API returned bad status code' }");
    })
    .catch( (err) => {
      //alert user there was a server error
      return res.json("{APIStatusCode: '404', message: '" + err + "' }");
    });
  }

  var exchangeObj = APIInfo[req.params.exchange]; //pulls exchange object from APIInfo object
  //pulls ticker url, paths of vars in resp from exchangeObj based on req.params
  var tickerInfoArr = exchangeObj[req.params.pair];
  //call standard API calling function with this info
  standardAPITicker(tickerInfoArr[0], tickerInfoArr[1], tickerInfoArr[2], tickerInfoArr[3]);

}); 

module.exports = router;