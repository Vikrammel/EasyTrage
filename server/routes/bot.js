//file for /trade related routes
const express = require('express');
const router = express.Router();
var axios = require('axios');
var ccxt = require ('ccxt')

//routes for /trade
router.get('/trade/:exchange/:pair/:buysell/:price/:amount', function (req, res) {
    res.json("trade requested on " + req.params.exchange + " to " + req.params.buysell
        + " " + req.params.amount + " " + req.params.pair.slice(3) + " worth of " + 
        req.params.pair.slice(0, 3) + " at " + req.params.price + " " + req.params.pair.slice(3) 
        + "/" + req.params.pair.slice(0, 3));
    // res.json(ccxt.exchanges);
});

//routes for /trade/move
router.get('/move/:ticker/:exchange1/:exchange2/:amount', function (req,res){
    res.json("move " + req.params.amount + " " + req.params.ticker + " from " + req.params.exchange1 + 
        " to " + req.params.exchange2 + " requested");
});

module.exports = router;