//file for /auth related routes (login, register, etc)

const express = require('express');
var jwt = require('jsonwebtoken');
var User = require('../model/user');
var bcrypt = require('bcryptjs');
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
  ensureToken(req, (token)=> {
    // var token = req.body.token;
    var newPass = req.body.newPassword;
    var pass = req.body.password;
    var failure = { success: false };
    var success = { success: true, message: "password modified!" };
    var goodset = { success: true, message: "settings saved!" };
    var exchanges = Object.assign({}, req.body);
    delete exchanges.newPassword;
    delete exchanges.password;
    delete exchanges.token;
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
            User.findOneAndUpdate({ token: token }, exchanges, (err, user) => {
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
  ensureToken(req, (token) =>{
    console.log("Settings requested with token: " + token);
    // const token = req.header("token");
    User.findOne({ token: token }, (err, user) => {
      if (err) {
        res.json({ success: false, message: String(err) });
      } else {
        res.json({ success: true, message: JSON.stringify(user) });
      }
    });
  });
});

// get settings for populating client form fields
router.post('/logout', (req, res, next) => {
  ensureToken(req, (token) => {
    // const token = req.body.token;
    User.findOneAndUpdate({ token: token }, { token: "" }, (err, user) => {
      if (err) {
        res.json({ success: false, message: String(err) });
      } else {
        logger("logged out " + String(user.email));
        return res.json({ success: true, message: "Successfully logged out" });
      }
    });
  });
});

router.post('/register', function (req, res) {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password
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
        User.addUser(newUser, (err, user) => {
          if (err) {
            logger("{success: false, message: ' " + String(err) + "' }");
            return res.json({ success: false, message: err });
          } else {
            const token = jwt.sign({ user: newUser }, 'temp_pass');
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
function ensureToken(req, next) {
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
function ensureUser(req){
  ensureToken(req, (token)=>{
    User.findOne({ token: token }, (err, user) => {
      if (err) {
        return { success: false, message: String(err) };
      } else {
        return { success: true, message: JSON.stringify(user) };
      }
    });
  });
}

module.exports = router;
