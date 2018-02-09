'use strict'

var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var User = require('./model/user');

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;

mongoose.connect('mongodb://mongo/easytrage');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/api', router);

router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

router.post('/login', function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
    if(err){
      return res.json({success: false, message: err});
    } else {
      if(!user) {
        return res.json({ success: false, message: 'Email not in use'} );
      } else {
        if (user.password == password){
          const token = jwt.sign({ user: req.user }, 'temp_pass');
          return res.json({ success: true, token: token });
        } else {
          return res.json({ success: false, message: 'Incorrect password'} );
        }
      }
    }
  });
});

router.post('/register', function(req,res) {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.getUserByEmail(newUser.email, (err, user) => {
    if(err){
      return res.json({success: false, message: err});
    } else {
      if(!user) {
        User.addUser(newUser, (err, user) => {
          if(err){
            return res.json({success: false, message: err});
          } else {
            const token = jwt.sign({ user: newUser }, 'temp_pass');
            return res.json({success: true, token: token});
          }
        });
      } else {
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


app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
