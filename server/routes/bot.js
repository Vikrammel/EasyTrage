//file for /trade related routes
const express = require('express');
const router = express.Router();
var axios = require('axios');
var ccxt = require ('ccxt')
const auth = require('./auth');

//routes for /bot/trade
router.post('/trade', function (req, res) {
    auth.ensureUser(req, res, (user)=> {
        console.log("ensured user in bot/trade route");
        var action = '';
        var currencyToBuy = '';
        var currencyToBuyWith = '';
        if (req.body.buySell === 'buy'){
            action = 'bought';
            currencyToBuy = req.body.pair.slice(0, 3);
            currencyToBuyWith = req.body.pair.slice(3);
            setTimeout(()=>{res.json({success: true, message: (user.email + " " + action
            + " " + parseFloat(req.body.amount).toFixed(4) + " " + currencyToBuyWith + " worth of " + 
            currencyToBuy + " at " + req.body.price + " " + currencyToBuyWith 
            + "/" + currencyToBuy + " on " + req.body.exchange)})}, 1500);
        }
        else if (req.body.buySell === 'sell'){
            action = 'sold';
            currencyToBuy = req.body.pair.slice(3);
            currencyToBuyWith = req.body.pair.slice(0, 3);
            setTimeout(()=>{res.json({success: true, message: (user.email + " " + action
            + " " + parseFloat(req.body.amount).toFixed(4) + " " + currencyToBuyWith + " at " + 
            req.body.price + " " + currencyToBuy + "/" + currencyToBuyWith + " on " + req.body.exchange)})}, 1500);
        }

        // res.json(ccxt.exchanges);
    });
    // res.json({success: false, message: "error parsing trade request"});
});

//routes for /bot/move
router.post('/transfer', function (req,res){
    auth.ensureUser(req, res, (user)=> {
        console.log("ensured user in bot/transfer route");
        setTimeout(()=>{res.json({success: true, message: (user.email + " transferred " + 
            parseFloat(req.body.amount).toFixed(4) + " " + req.body.ticker + " from " + req.body.exchange1 + " to "
             + req.body.exchange2 + " at " + req.body.ticker + " address " + req.body.address)})}, 1700);
    });
    // res.json({success:false, message: "error parsing move request"});
});

module.exports = router;