//model/comment.js

'use strict';

//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create instance of mongoose.schema. Schema takes an object
//that shows the shape/structure of db entries

var UsersSchema = new Schema({
    username: String,
    email: String
});

//export module to use in server.js
module.exports = mongoose.model('User', UsersSchema);