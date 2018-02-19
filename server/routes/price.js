//file for /price related routes
const express = require('express');
const router = express.Router();
var axios = require('axios');

router.get('/:pair/:exchange/:bidask?', function(req, res) {

  ///////////////////////////////////////////pair: BTCUSD
  if(req.params.pair == "BTCUSD"){

    //chasing-coins BTCUSD route, not actually useful for trading, this route is for learning / testing
    if(req.params.exchange == 'chasing-coins'){
      //BTCUSD
        axios.get("https://chasing-coins.com/api/v1/std/coin/BTC")  
          .then( (APIres) => {
            //use res from server as APIres
            var status = APIres.status; //status code of response from exchange API
            //price to return to user:
            var price = APIres.data.price;

            if (status == 200) {
              //call had an 'OK' status code, return price to user
              return res.json("{APIStatusCode: '" + status +"', price: '" + APIres.data.price + "' }");
            }
            //call didn't return status 200, return status and error message to user
            return res.json("{APIStatusCode: '" + status + "', message: 'API returned bad status code' }");
          })
          .catch( (err) => {
            //alert user there was a server error
            return res.json("{APIStatusCode: '404', message: '" + err + "' }");
          });
    }

  }//end BTCUSD routes

  ///////////////////////////////////////////pair: XRPUSD
  else if (req.params.pair == 'XRPUSD'){

    //bitstamp XRPUSD route
    if(req.params.exchange == 'bitstamp'){
        axios.get("https://www.bitstamp.net/api/v2/ticker/XRPUSD")  
        .then( (APIres) => {
          var status = APIres.status;

          if (status == 200) {

            var price;

            //get correct price based of request params
            if (req.params.bidask == 'bid'){
              price = APIres.data.bid;
            } else if (req.params.bidask == 'ask') {
              price = APIres.data.ask;
            } else {
              price = APIres.data.last;
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

    //bitfinex XRPUSD roure
    else if(req.params.exchange == 'bitfinex'){
      if(req.params.pair == 'XRPUSD'){
        axios.get("https://api.bitfinex.com/v1/pubticker/XRPUSD")  
          .then( (APIres) => {
            var status = APIres.status;
            //bitfinex returns a string status code, need to cast for some reason
            if (String(status) == "200") {
              var price;
  
              //get correct price based of request params
              if (req.params.bidask == 'bid'){
                price = APIres.data.bid;
              } else if (req.params.bidask == 'ask') {
                price = APIres.data.ask;
              } else {
                price = APIres.data.last_price;
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
    }

  }//end XRPUSD routes
  
  ///////////////////////////////////////////pair: XRPBTC
  else if (req.params.pair == 'XRPBTC'){

    //coinegg XRPBTC route
    if(req.params.exchange == 'coinegg'){
        axios.get("https://api.coinegg.com/api/v1/ticker?coin=xrp")  
          .then( (APIres) => {
            var status = APIres.status;

            if (status == 200) {

              var price;

              //get correct price based of request params
              if (req.params.bidask == 'bid'){
                price = APIres.data.sell;
              } else if (req.params.bidask == 'ask') {
                price = APIres.data.buy;
              } else {
                price = APIres.data.last;
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

    //bittrex XRPBTC route
    else if(req.params.exchange == 'bittrex'){
        axios.get("https://bittrex.com/api/v1.1/public/getticker?market=btc-xrp")  
          .then( (APIres) => {
            var status = APIres.status;
  
            if (status == "200") {
              //bittrex 'success' checker (they save a success property in the JSON obj)
              if (APIres.data.success == true || APIres.data.success == "true"){
                var price;
  
                //get correct price based of request params
                if (req.params.bidask == 'bid'){
                  price = APIres.data.result.Bid;
                } else if (req.params.bidask == 'ask') {
                  price = APIres.data.result.Ask;
                } else {
                  price = APIres.data.result.Last;
                }
  
                return res.json("{APIStatusCode: '" + status + "', price: '" + price + "' }");
              }
            }
            return res.json("{APIStatusCode: '" + status + "', message: 'API returned bad status code' }");
          })
          .catch( (err) => {
            //alert user there was a server error
            return res.json("{APIStatusCode: '404', message: '" + err + "' }");
          });
    }
  
    else if(req.params.exchange == 'okex'){
      axios.get("https://www.okex.com/api/v1/ticker.do?symbol=xrp_btc")  
        .then( (APIres) => {
          var status = APIres.status;
  
          if (status == 200) {
            var price;

            //get correct price based of request params
            if (req.params.bidask == 'bid'){
              price = APIres.data.ticker.sell;
            } else if (req.params.bidask == 'ask') {
              price = APIres.data.ticker.buy;
            } else{
              price = APIres.data.ticker.last;
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

  }//end XRPBTC routes


    
}); 

module.exports = router;