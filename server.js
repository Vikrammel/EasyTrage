'use strict'

var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var User = require('./model/users');

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
  const token = jwt.sign({ user: 'testuser' }, 'temp_pass');
  res.json({
    message: 'Authenticated! Use this token in the "authorization" header',
    token: token
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
