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
        return res.json({success: true, message: (user.email + " requested to " + req.body.buySell
            + " " + req.body.amount + " " + req.body.pair.slice(3) + " worth of " + 
            req.body.pair.slice(0, 3) + " at " + req.body.price + " " + req.body.pair.slice(3) 
            + "/" + req.body.pair.slice(0, 3) + " on " + req.body.exchange)});
        // res.json(ccxt.exchanges);
    });
    // res.json({success: false, message: "error parsing trade request"});
});

//routes for /bot/move
router.get('/move', function (req,res){
    auth.ensureUser(req, res, (user)=> {
        return res.json({success: true, message: (user.email + "requested to move " + req.body.amount + " " + req.body.ticker + 
            " from " + req.body.exchange1 + " to " + req.body.exchange2)});
    });
    // res.json({success:false, message: "error parsing move request"});
});

module.exports = router;