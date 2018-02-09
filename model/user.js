//model/comment.js

'use strict';

//import dependency
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

//create instance of mongoose.schema. Schema takes an object
//that shows the shape/structure of db entries

var UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {runSettersOnQuery: true} );

//export module to use in server.js
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByEmail = function(email, callback){
    const query = {email: email};
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(password, hash, callback){
    bcrypt.compare(password, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}
