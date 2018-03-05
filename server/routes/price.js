//file for /price related routes
const express = require('express');
const router = express.Router();
var axios = require('axios');
var suggestions = require('./suggestions.js');

//object to store APIURLs and paths to prices within JSON response
var XRPAPIInfo = require("./XRPAPIInfo.json");

var currentPrices = {}; //var to store latest prices to return and calculate off of

//function to standardize API call using URL and paths within JSON response to relevant prices
function standardAPITicker(APIURL, bidPath = '', askPath = '', lastPath = '', callback) {
  axios.get(APIURL)
    .then((APIres) => {
      var status = parseInt(APIres.status);

      if (status == 200) {

        //store different prices from response
        var prices = {};

        //loop through function arguments for paths to price types
        for (var arg in arguments) {
          if (arg > 0 && arg < 4) { // if we are one of the path arguments
            //set price type
            var priceType = 'bid';
            if (arg == 2) priceType = 'ask';
            else if (arg == 3) priceType = 'last';

            //set right path, fetch price from response and store in prices object
            var typePath = arguments[arg];
            if (typePath.length > 0) {
              //non-standard path
              prices[priceType] = APIres.data;
              var pathArr = typePath.split('.');
              for (var pathNode in pathArr) { //pathNode = index of JSON node in pathArr
                prices[priceType] = prices[priceType][pathArr[pathNode]];
              }
              prices[priceType] = parseFloat(prices[priceType]);
            } else prices[priceType] = parseFloat(APIres.data[priceType]); //standard path in JSON response

          }
        }
        //return success status code and prices object
        return callback({
          APIStatusCode: status,
          prices: prices
        });
      }
      //if res statuscode was not 200, return code and an error message
      return callback({
        APIStatusCode: status,
        message: 'API returned bad status code'
      });
    })
    .catch((err) => {
      //alert user there was a server error
      return callback({
        APIStatusCode: 404,
        message: String(err)
      });
    });
}

//function to call exchange pair endpoint and store it as a property of resObj
//need to do this because of JS asyncyrony when it comes to requests, requests can 
//execute outside of loops, etc at later times and then that messes up results
function callAndStore(pairArr, exchange, pair, resObj) {

  var pairURL = pairArr[0];
  var bidPath = pairArr[1];
  var askPath = pairArr[2];
  var lastPath = pairArr[3];


  //handle binance's second endpoint for last
  if (exchange == 'binance') {
    //bid and ask endpoint
    standardAPITicker(pairURL, bidPath, askPath, lastPath, (APIresp) => {
      //all these checks to make sure other call hasn't alraedy made these objects
      //inside the response object so it doesn't overwrite (which it will on assigment =)
      if (resObj[exchange]) {
        if (resObj[exchange][pair]) {
          if (resObj[exchange][pair]["prices"]) {
            if (APIresp.APIStatusCode == 200) {
              resObj[exchange][pair]["prices"]["bid"] = APIresp.prices.bid;
              resObj[exchange][pair]["prices"]["ask"] = APIresp.prices.ask;
            } else {
              resObj[exchange][pair]["prices"]["bid"] = APIresp.message;
              resObj[exchange][pair]["prices"]["ask"] = APIresp.message;
            }
          } else {
            resObj[exchange][pair]["prices"] = {};
            if (APIresp.APIStatusCode == 200) {
              resObj[exchange][pair]["prices"]["bid"] = APIresp.prices.bid;
              resObj[exchange][pair]["prices"]["ask"] = APIresp.prices.ask;
            } else {
              resObj[exchange][pair]["prices"]["bid"] = APIresp.message;
              resObj[exchange][pair]["prices"]["ask"] = APIresp.message;
            }
          }
        }
        else {
          resObj[exchange][pair] = {};
          resObj[exchange][pair]["prices"] = {};
          if (APIresp.APIStatusCode == 200) {
            resObj[exchange][pair]["APIStatusCode"] = 200;
            resObj[exchange][pair]["prices"]["bid"] = APIresp.prices.bid;
            resObj[exchange][pair]["prices"]["ask"] = APIresp.prices.ask;
          }
          else {
            resObj[exchange][pair]["APIStatusCode"] = 400;
            resObj[exchange][pair]["prices"]["bid"] = APIresp.message;
            resObj[exchange][pair]["prices"]["ask"] = APIresp.message;
          }
        }
      }
      else {
        resObj[exchange] = {};
        if (APIresp.APIStatusCode == 200) {
          resObj[exchange][pair] = APIresp;
        } else {
          resObj[exchange][pair] = {};
          resObj[exchange][pair]["prices"] = {};
          resObj[exchange][pair]["prices"]["ask"] = APIresp.message;
          resObj[exchange][pair]["prices"]["bid"] = APIresp.message;
        }
      }
    });

    //last price endpoint
    var binanceLastURL = "https://api.binance.com/api/v3/ticker/price?symbol=" + pair;
    standardAPITicker(binanceLastURL, bidPath, askPath, "price", (lastResp) => {
      if (resObj[exchange]) {
        if (resObj[exchange][pair]) {
          if (resObj[exchange][pair]["prices"]) {
            if (lastResp.APIStatusCode == 200) {
              resObj[exchange][pair]["prices"]["last"] = lastResp.prices.last;
            } else {
              resObj[exchange][pair]["prices"]["last"] = lastResp.message;
            }
          } else {
            resObj[exchange][pair]["prices"] = {};
            if (lastResp.APIStatusCode == 200) {
              resObj[exchange][pair]["prices"]["last"] = lastResp.prices.last;
            } else {
              resObj[exchange][pair]["prices"]["last"] = lastResp.message;
            }
          }
        }
        else {
          resObj[exchange][pair] = {};
          resObj[exchange][pair]["prices"] = {};
          if (lastResp.APIStatusCode == 200) {
            resObj[exchange][pair]["APIStatusCode"] = 200;
            resObj[exchange][pair]["prices"]["last"] = lastResp.prices.last;
          }
          else {
            resObj[exchange][pair]["prices"]["last"] = lastResp.message;
          }
        }
      }
      else {
        resObj[exchange] = {};
        if (lastResp.APIStatusCode == 200) {
          resObj[exchange][pair] = lastResp;
        } else {
          resObj[exchange][pair] = {};
          resObj[exchange][pair]["prices"] = {};
          resObj[exchange][pair]["prices"]["last"] = lastResp.message;
        }
      }
    });
  }///////////////end of binance mess handling

  //non-binance exchange
  else {
    standardAPITicker(pairURL, bidPath, askPath, lastPath, (APIresp) => {
      if (resObj[exchange]) resObj[exchange][pair] = APIresp;
      else { resObj[exchange] = {}; resObj[exchange][pair] = APIresp; }
    });
  }

}////////////end of callAndStore function

//function to fetch all prices and store them in currentPrices
function getAllPrices(callback) {
  for (var exchange in XRPAPIInfo) {
    if (XRPAPIInfo.hasOwnProperty(exchange)) {
      //grab exchange object from JSON of XRP API info
      var exchangeObj = XRPAPIInfo[exchange];
      //loop through pairs in exchange
      for (var pair in exchangeObj) {
        if (exchangeObj.hasOwnProperty(pair)) {
          //grab the url and paths within response json to different prices
          //for the specific pair of the exchange
          var pairArr = exchangeObj[pair];
          //call abstracted function to make call and store response as propert of resObj
          //so function calls don't mess with each other due to
          //js http request asynchrony
          callAndStore(pairArr, exchange, pair, currentPrices);
        }
      }
    }
  }

  // ~1 second seems to be a good amount of time till all the exchanges respond
  setTimeout(() => { 
    suggestions.generateSuggestions(currentPrices);
    return; 
  }, 1200);
}

//get all prices ever n ms
getAllPrices();
setInterval(getAllPrices, 50000); 

//routes for /price
router.get('/:pair?/:exchange?/:bidask?', function (req, res) {

  //function to standardize calls to api so code is more readable


  //general /price route
  if (!req.params.pair) {
    return res.json(currentPrices);
  } ///////////////end of general /price route


  //user specified pair but not an exchange
  else if (!req.params.exchange) {
    //very similar idea to /price route, look at comments on the if above this else if 
    //for explanations
    var resObj = {};
    var pair = req.params.pair; //pair user requested prices for

    for (var exchange in currentPrices) {
      if (currentPrices.hasOwnProperty(exchange)) {
        var exchangeObj = currentPrices[exchange];//grab exchange object from JSON of XRP API info
        if (exchangeObj.hasOwnProperty(pair)) {
          resObj[exchange] = {};
          resObj[exchange][pair] = exchangeObj[pair];
        }
      }
    }

    if (Object.keys(resObj).length > 0) return res.json(resObj)
    else return res.json({ status: 404, message: "pair not found" });

  } ///////////////end of general /price/pair route



  //user supplied specific pair and exchange
  else {
    var pair = req.params.pair;
    var exchange = req.params.exchange;

    var pairObj = currentPrices[exchange][pair];

    if (pairObj) {
      return res.json(pairObj);
    } 
    
    else {
      return res.json({
        status: 404,
        message: "Exchange or pair not found. call /api/price for a full list of exchanges and pairs."
      });
    }

  }///////////////end of specific /price/pair/exchange route


});

module.exports = router;
