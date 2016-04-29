/**
 * Created by developer on 23.04.16.
 */


var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name:String,
    password:String,
    typeUser:String,
    fillAccount:Number,
    bucket:Object
});

module.exports = mongoose.model('User', UserSchema);