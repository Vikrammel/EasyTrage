'use strict'

var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var cors = require('cors');
var User = require('./model/user');
var env = require('./config/env');
var fs = require('fs');
var axios = require('axios');

//https key/cert setup
var hskey = fs.readFileSync(env.HTTPS_KEY);
var hscert = fs.readFileSync(env.HTTPS_CERT);
var options = {key: hskey, cert:hscert};
var app = express(options);

var router = express.Router();

var port = process.env.API_PORT || 3001;

mongoose.connect(env.DATABASE);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//logs to console if toggle is on
var logging = true;

function logger(message){
  if (logging === true){
    console.log(message);
  }
}

app.use('/api', router);

router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

router.post('/login', function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  logger("request body: " + String(req.body));
  logger("request: " + String(req));
  logger("email: " + email);
  logger("password: " + password);
  User.getUserByEmail(email, (err, user) => {
    if(err){
      logger("error: " + String(err));
      return res.json({success: false, message: err});
    } else {
      if(!user) {
        logger("{ success: false, message: 'Email not in use' }");
        return res.json({ success: false, message: 'Email not in use'} );
      } else {
          User.validatePassword(password, user.password, (err, isMatch) => {
            if(err){
              logger("error: " + String(err));
              throw err;
            } 
            if(isMatch){
              const token = jwt.sign({ user: req.user }, 'temp_pass');
              logger("{ success: true, token: '" + token + "' }");
              return res.json({ success: true, token: token });
            } else {
              logger("{ success: false, message: 'Incorrect password' }");
            return res.json({ success: false, message: 'Incorrect password'} );
            }
          });
      }
    }
  });
});

router.get('/price/:coin/:exchange/:bidask?', function(req, res) {
  if (req.params.coin === 'BTC'){
    if(req.params.exchange === 'chasing-coins'){
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
  } else if (req.params.coin === 'XRP'){
    if(req.params.exchange === 'bitstamp'){
      axios.get("https://www.bitstamp.net/api/v2/ticker/XRPUSD")  
        .then( (APIres) => {
          //use res from server
          if (APIres.status == 200) {
            // return res.json(JSON.stringify(APIres));
            var bitstampPrice;
            try{
              if (req.params.bidask === 'bid'){
                bitstampPrice = APIres.data.bid;
              } else if (req.params.bidask == 'ask') {
                bitstampPrice = APIres.data.ask;
              } 
              return res.json("{APIStatusCode: '" + APIres.status +"', price: '" + bitstampPrice + "' }");
            } catch(err) {
              null;
            } try{
              bitstampPrice = APIres.data["last"];
            } catch(err){
              return res.json("{API last price data error: '" + err + "' }");
            }
            return res.json("{APIStatusCode: '" + APIres.status +"', price: '" + bitstampPrice + "' }");
          }
          return res.json("{APIStatusCode: '" + APIres.status + "', message: 'API returned bad status code' }");
        })
        .catch( (err) => {
          //alert user there was a server error
          return res.json(err);
        });
    }
  }
 }); 

router.post('/register', function(req,res) {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  });
  logger("request body: " + String(req.body));
  logger("request: " + String(req));
  logger("email: " + newUser.email);
  logger("password: " + newUser.password);
  User.getUserByEmail(newUser.email, (err, user) => {
    if(err){
      logger("error: " + String(err));
      return res.json({success: false, message: err});
    } else {
      if(!user) {
        User.addUser(newUser, (err, user) => {
          if(err){
            logger("{success: false, message: ' " + String(err) + "' }");
            return res.json({success: false, message: err});
          } else {
            const token = jwt.sign({ user: newUser }, 'temp_pass');
            logger("{ success: true, token: '" + token + "' }");
            return res.json({success: true, token: token});
          }
        });
      } else {
        logger("{ success: false, message: 'Email in use. Please log"
          + " in or use another email instead' }");
        return res.json({success: false, message: 
          "Email in use. Please log in or use another email instead"});
      }
    }
  });
});

router.get('/protected', ensureToken, function(req, res) {
  jwt.verify(req.token, 'secret_key_goes_here', function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        description: 'Protected information. Congrats!'
      });
    }
  });
});

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}


app.listen(port, "0.0.0.0", function() {
  logger(`api running on port ${port}`);
});
