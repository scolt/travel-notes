'use strict';

/* Declare DB model for User entity */
let mongoose = require('mongoose');
let crypto = require('crypto');
let config = require('../config');
let Schema = mongoose.Schema;
let UserSchema = new Schema({
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

let User = mongoose.model('users', UserSchema);

/* Adding actions for user */
let jwt = require('jsonwebtoken');
let UsersActions = {
    login(req, res, next) {
        User.findOne({email: req.body.username}, function (err, user) {
            if (err) {
                res.status(500);
                res.send('Unexpected error');
                return;
            }
            if (!user) {
                res.status(401);
                res.send('Incorrect login or password');
                return;
            }
            if (!user.validPassword(req.body.password)) {
                res.status(401);
                res.send('Incorrect login or password');
                return;
            }
            var token = jwt.sign(user, config.secret, {expiresIn: 60 * 5});
            res.json({token: token});
        });
    },

    register(req, res, next) {
        try {
            User({email: req.body.email,
                password: req.body.password,
                username: req.body.username}).save(function (err, user) {
                if (err) {
                    res.status('500');
                    res.json({code: err.code.toString()});
                } else {
                    var token = jwt.sign(user, config.secret, {expiresIn: 60 * 5});
                    res.json({token: token});
                }
            });
        } catch(e) {
            console.log(e.toString);
        }
    },

    logout(req, res) {
        req.logOut();
        res.send(200);
    },

    me(req, res, next) {
        delete req.user.password;
        res.send(req.user);
    }
};

module.exports = UsersActions;
