//file for /time related routes
const express = require('express');
const router = express.Router();
var axios = require('axios');

//object to store APIURLs and paths to prices within JSON response
var exchangeInfo = require("../exchangeInfo.json");

router.get('/:exchange?', function (req, res) {
    if(req.params.exchange){
        res.json("/time/" + req.params.exchange + " endpoint");
    } else {
        res.json("/time endpoint");
    }
});

module.exports = router;