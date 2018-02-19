//file for /price related routes
const express = require('express');
const router = express.Router();
var axios = require('axios');

router.get('/:coin/:exchange/:bidask?', function(req, res) {
    if (req.params.coin == 'BTC'){
      if(req.params.exchange == 'chasing-coins'){
        axios.get("https://chasing-coins.com/api/v1/std/coin/BTC")  
          .then( (APIres) => {
            //use res from server
            if (APIres.status == 200) {
              // return res.json(JSON.stringify(APIres));
              return res.json("{APIStatusCode: '" + APIres.status +"', price: '" + APIres.data.price + "' }");
            }
            return res.json("{APIStatusCode: '" + APIres.status + "', message: 'API returned bad status code' }");
          })
          .catch( (err) => {
            //alert user there was a server error
            return res.json(err);
          });
      }
    } 
    else if (req.params.coin == 'XRP'){
      if(req.params.exchange == 'bitstamp'){
        axios.get("https://www.bitstamp.net/api/v2/ticker/XRPUSD")  
          .then( (APIres) => {
            //use res from server
  
            var status = APIres.status; //status code of response from exchange API
  
            if (status == 200) {
              // return res.json(JSON.stringify(APIres));
              var price;
              try{
                if (req.params.bidask == 'bid'){
                  price = APIres.data.bid;
                } else if (req.params.bidask == 'ask') {
                  price = APIres.data.ask;
                } 
              } catch(err) {
                null;
              } try{
                price = APIres.data.last;
              } catch(err){
                return res.json("{API last price data error: '" + err + "' }");
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
      else if(req.params.exchange == 'coinegg'){
        axios.get("https://api.coinegg.com/api/v1/ticker?coin=xrp")  
          .then( (APIres) => {
            //use res from server
            var status = APIres.status; //status code of response from exchange API
  
            if (status == 200) {
              // return res.json(JSON.stringify(APIres));
              var price;
              try{
                if (req.params.bidask == 'bid'){
                  price = APIres.data.sell;
                } else if (req.params.bidask == 'ask') {
                  price = APIres.data.buy;
                } 
              } catch(err) {
                null;
              } try{
                price = APIres.data.last;
              } catch(err){
                return res.json("{API last price data error: '" + err + "' }");
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
      else if(req.params.exchange == 'bittrex'){
        axios.get("https://bittrex.com/api/v1.1/public/getticker?market=btc-xrp")  
          .then( (APIres) => {
            //use res from server
            var status = APIres.status; //status code of response from exchange API
  
            if (status == 200) {
              // return res.json(JSON.stringify(APIres));
              if (APIres.data.success == true || APIres.data.success == "true"){
                var price;
                try{
                  if (req.params.bidask == 'bid'){
                    price = APIres.data.result.Bid;
                  } else if (req.params.bidask == 'ask') {
                    price = APIres.data.result.Ask;
                  } 
                } catch(err) {
                  null;
                } try{
                  price = APIres.data.result.Last;
                } catch(err){
                  return res.json("{API last price data error: '" + err + "' }");
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
      else if(req.params.exchange == 'bitfinex'){
        axios.get("https://api.bitfinex.com/v1/pubticker/XRPUSD")  
          .then( (APIres) => {
            //use res from server
            var status = APIres.status; //status code of response from exchange API
  
            if (String(status) == "200") {
              // return res.json(JSON.stringify(APIres));
              var price;
              try{
                if (req.params.bidask == 'bid'){
                  price = APIres.data.bid;
                } else if (req.params.bidask == 'ask') {
                  price = APIres.data.ask;
                } 
              } catch(err) {
                null;
              } try{
                price = APIres.data.last_price;
              } catch(err){
                return res.json("{API last price data error: '" + err + "' }");
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
      else if(req.params.exchange == 'okex'){
        axios.get("https://www.okex.com/api/v1/ticker.do?symbol=xrp_btc")  
          .then( (APIres) => {
            //use res from server
            var status = APIres.status; //status code of response from exchange API
  
            if (status == 200) {
              // return res.json(JSON.stringify(APIres));
              var price;
              try{
                if (req.params.bidask == 'bid'){
                  price = APIres.data.ticker.sell;
                } else if (req.params.bidask == 'ask') {
                  price = APIres.data.ticker.buy;
                } 
              } catch(err) {
                null;
              } try{
                price = APIres.data.ticker.last;
              } catch(err){
                return res.json("{API last price data error: '" + err + "' }");
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
}); 

module.exports = router;