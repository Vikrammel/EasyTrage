//file for /auth related routes (login, register, etc)

const express = require('express');
var jwt = require('jsonwebtoken');
var User = require('../model/user');
const router = express.Router();

//logs to console if toggle is on
var logging = true;

function logger(message){
  if (logging === true){
    console.log(message);
  }
}

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

  module.exports = router;