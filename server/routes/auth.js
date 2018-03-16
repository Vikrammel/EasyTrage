//file for /auth related routes (login, register, etc)

const express = require('express');
var jwt = require('jsonwebtoken');
var User = require('../model/user');
var bcrypt = require('bcryptjs');
var CryptoJS = require("crypto-js");
var env = require('../config/env');
var fs = require('fs');
var hskey = fs.readFileSync(env.HTTPS_KEY); //private key to encrypt api keys and secrets

const router = express.Router();

//logs to console if toggle is on
var logging = true;

function logger(message) {
  if (logging === true) {
    console.log(message);
  }
}

router.post('/login', function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  User.getUserByEmail(email, (err, user) => {
    if (err) {
      logger("error: " + String(err));
      return res.json({ success: false, message: err });
    } else {
      if (!user) {
        logger("{ success: false, message: 'Email not in use' }");
        return res.json({ success: false, message: 'Email not in use' });
      } else {
        User.validatePassword(password, user.password, (err, isMatch) => {
          if (err) {
            logger("error: " + String(err));
            throw err;
          }
          if (isMatch) {
            const token = jwt.sign({ user: req.user }, 'temp_pass');
            User.findOneAndUpdate({ email: email }, { token: token }, (err, user) => {
              if (err) {
                res.json({ success: false, message: String(err) });
              } else {
                logger(user.email + " logged in");
              }
            });

            logger("{ success: true, token: '" + token + "' }");
            return res.json({ success: true, token: token });
          } else {
            logger("{ success: false, message: 'Incorrect password' }");
            return res.json({ success: false, message: 'Incorrect password' });
          }
        });
      }
    }
  });
});

// update user settings
router.post('/settings', (req, res, next) => {
  ensureToken(req, res, (token)=> {
    // var token = req.body.token;
    var newPass = req.body.newPassword;
    var pass = req.body.password;
    var failure = { success: false };
    var success = { success: true, message: "password modified!" };
    var goodset = { success: true, message: "settings saved!" };
    logger("settings update requested with token " + token);
    console.log("settings post request body: " + JSON.stringify(req.body.apiKeys));
    // var encryptedKeys = CryptoJS.AES.encrypt(JSON.stringify(req.body.apiKeys), hskey);
    User.getUserByToken(token, (err, user) => {
      if (err) {
        res.json(failure);
      }
      if (user) {
        User.validatePassword(pass, user.password, (err, isMatch) => {
          if (err) {
            logger("error: " + String(err));
            failure.message = String(err);
            res.json(failure);
          }
          if (isMatch) {
            if (newPass) {
              User.editUser(user, newPass, err => {
                if (err) {
                  logger("failed to edit pass: " + String(err));
                  res.json(failure);
                }
                // console.log(success);
              });
            }
            User.findOneAndUpdate({ token: token }, {apiKeys: JSON.stringify(req.body.apiKeys)}, (err, user) => {
              if (err) {
                logger("error updating exchanges: " + String(err));
                failure.message = String(err);
                res.json(failure);
              } else {
                logger("keys updated");
                res.json(goodset);
              }
            });
          }
          else {
            var badpass = { success: false, message: "bad password" };
            console.log(badpass);
            res.json(badpass);
          }
        });
      }
    });
  });
});

//get 
// get settings for populating client form fields
router.get('/settings', (req, res, next) => {
  ensureToken(req, res, (token) =>{
    console.log("Settings requested with token: " + token);
    // const token = req.header("token");
    User.findOne({ token: token }, (err, user) => {
      if (err) {
        logger(String(err));
        res.json({ success: false, message: String(err) });
      } else {
        // var userDecrypted = Object.assign({},user);
        // if(userDecrypted.apiKeys){
        //   // userDecrypted.apiKeys = CryptoJS.AES.decrypt(userDecrypted.apiKeys, hskey);
        //   // userDecrypted.apiKeys = userDecrypted.apiKeys.toString(CryptoJS.enc.Utf8);
        //   console.log("apiKeys exists");
        //   userDecrypted.apiKeys = JSON.parse(userDecrypted.apiKeys);
        // }
        // else{
        //   userDecrypted["apiKeys"] = {
        //     bittrex: {key:'',secret:''},
        //     bitfinex: {key:'',secret:''},
        //     bitstamp: {key:'',secret:''},
        //     hitbtc: {key:'',secret:''},
        //     binance: {key:'',secret:''},
        //     poloniex: {key:'',secret:''},
        //     kraken: {key:'',secret:''},
        //     exmo: {key:'',secret:''},
        //     cexio: {key:'',secret:''},
        //     gateio: {key:'',secret:''}
        //   }
        // }
        if(!user){
          res.json({success:false, message: "Bad Token. Please try clearing your browsing history and logging in again."});
        }else{
          logger("successfully returned user settings: " + user);
          res.json({ success: true, message: user });
        }

      }
    });
  });
});

// get settings for populating client form fields
router.post('/logout', (req, res, next) => {
  ensureToken(req, res, (token) => {
    // const token = req.body.token;
    console.log("logout for token " + token + " requested");
    User.findOneAndUpdate({ token: token }, { token: "" }, (err, user) => {
      if (err) {
        logger(String(err));
        res.json({ success: false, message: String(err) });
      } else {
        if(!user){
          res.json({ success: false, message: 
            "Logout unsuccessful. Please try clearing your browsing history and logging in again." });
        }
        else{
          logger("logged out " + String(user.email));
          return res.json({ success: true, message: "Successfully logged out" });
        }
      }
    });
  });
});

router.post('/register', function (req, res) {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
    token: ''
  });
  logger("request body: " + String(req.body));
  logger("request: " + String(req));
  logger("email: " + newUser.email);
  logger("password: " + newUser.password);
  User.getUserByEmail(newUser.email, (err, user) => {
    if (err) {
      logger("error: " + String(err));
      return res.json({ success: false, message: err });
    } else {
      if (!user) {
        const token = jwt.sign({ user: newUser }, 'temp_pass');
        // newUser.token = token;
        User.addUser(newUser, (err, user) => {
          if (err) {
            logger("{success: false, message: ' " + String(err) + "' }");
            return res.json({ success: false, message: err });
          } else {
            logger("{ success: true, token: '" + token + "' }");
            return res.json({ success: true, token: token });
          }
        });
      } else {
        logger("{ success: false, message: 'Email in use. Please log"
          + " in or use another email instead' }");
        return res.json({
          success: false, message:
            "Email in use. Please log in or use another email instead"
        });
      }
    }
  });
});

//make sure a token was provided in a request, can be in req.body or a header
function ensureToken(req, res, next) {
  var headerToken = req.header("token");
  var bodyToken = req.body.token;
  if ((!headerToken || headerToken.length < 1) && (!bodyToken || bodyToken.length < 1)){
    res.json({success: false, message: 
      "Token is invalid. Please try clearing browsing history and logging in again"});
  }
  else{
    logger("ensured that token was provided. continuing with request...");
    if (headerToken && headerToken.length > 0){ next(headerToken) }
    else{
      next(bodyToken);
    }
  }
}

//make sure the user with the provided token has a registered account in the db
function ensureUser(req, res, next){
  ensureToken(req, res, (token)=>{
    User.findOne({ token: token }, (err, user) => {
      if (err) {
        res.json( { success: false, message: String(err) });
      } else {
        next(user);
      }
    });
  });
}

module.exports = {
  router: router,
  ensureToken: ensureToken,
  ensureUser: ensureUser
};
