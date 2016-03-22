'use strict';

var mongoose = require('mongoose');

var crypto = require('crypto');
var config = require('../config');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    username: String,
    text: String,
    role: String
});

function encrypt(text){
    var cipher = crypto.createCipher(config.algorithm, config.password);
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text){
    var decipher = crypto.createDecipher(config.algorithm, config.password);
    var dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
}

UserSchema.pre('save', function(next) {
    this.password = encrypt(this.password);
    this.role = 'user';
    next();
});

UserSchema.methods.validPassword = function(password) {
    return encrypt(password) == this.password;
};

var User = mongoose.model('users', UserSchema);

module.exports = User;
