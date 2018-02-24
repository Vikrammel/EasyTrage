//file for /time related routes
const express = require('express');
const router = express.Router();
var axios = require('axios');

//object to store APIURLs and paths to prices within JSON response
var exchangeInfo = require("../exchangeInfo.json");

router.get('/', function (req, res) {
    res.json("/suggestions endpoint");
});

module.exports = router;