//file for /price related routes
const express = require('express');
const router = express.Router();
var axios = require('axios');

//object to store APIURLs and paths to prices within JSON response
var APIInfo = require("./APIInfo.json");

router.get('/:pair/:exchange/:bidask?', function(req, res) {

  //function to standardize calls to api so code is more readable
  function standardAPITicker(APIURL, bidPath = '', askPath = '', lastPath = ''){
    axios.get(APIURL)  
    .then( (APIres) => {
      var status = APIres.status;

      if (status == 200) {

        var price;
        var bidAskStr; //store "bid", "ask", or "last" to return in response

        //get correct price based of request params
        if (req.params.bidask == 'bid'){
          bidAskStr = 'bid';
          if(bidPath.length > 0) {
            //non-standard path
            price = APIres.data;
            var pathArr = bidPath.split('.');
            for (var pathNode in pathArr){ //pathNode = index of JSON node in pathArr
              price = price[pathArr[pathNode]];
            }
          } else price = APIres.data.bid; //standard path in JSON response

        } else if (req.params.bidask == 'ask') {
          bidAskStr = 'ask';
          if(askPath.length > 0) {
            //non-standard path
            price = APIres.data;
            var pathArr = askPath.split('.');
            for (var pathNode in pathArr){ //pathNode = index of JSON node in pathArr
              price = price[pathArr[pathNode]];
            }
          } else price = APIres.data.ask; //standard path in JSON response
        } else {
          bidAskStr = 'last';
          if(lastPath.length > 0) {
            //non-standard path
            price = APIres.data;
            var pathArr = lastPath.split('.');
            for (var pathNode in pathArr){ //pathNode = index of JSON node in pathArr
              price = price[pathArr[pathNode]];
            }
          } else price = APIres.data.last; //standard path in JSON response
        }

        return res.json("{ APIStatusCode: '" + status + "', price: '" + price + "', exchange: '" 
          + req.params.exchange + "', pair: '" + req.params.pair +"', priceType: '" + bidAskStr + "' }");
      }
      return res.json("{ APIStatusCode: '" + status + "', message: 'API returned bad status code' }");
    })
    .catch( (err) => {
      //alert user there was a server error
      return res.json("{ APIStatusCode: '404', message: '" + err + "' }");
    });
  }

  //binance doesn't have same endpoint for last price and bid/ask so, have to deal with that:
  if(req.params.exchange == "binance" && req.params.bidask!="bid" && req.params.bidask!="ask"){
    standardAPITicker("https://api.binance.com/api/v3/ticker/price?symbol=" + 
      req.params.pair, "", "", "price");
  }

  var exchangeObj = APIInfo[req.params.exchange]; //pulls exchange object from APIInfo object
  //pulls ticker url, paths of vars in resp from exchangeObj based on req.params
  var tickerInfoArr = exchangeObj[req.params.pair];
  //call standard API calling function with this info
  standardAPITicker(tickerInfoArr[0], tickerInfoArr[1], tickerInfoArr[2], tickerInfoArr[3]);

}); 

module.exports = router;