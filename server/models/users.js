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
    role: String,
    avatar: String,
    salt: String
});

let cloudinary = require('cloudinary');

function generateSalt() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

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
    this.salt = generateSalt();
    this.password = encrypt(this.password + this.salt);
    this.role = 'user';
    next();
});

UserSchema.methods.validPassword = function(password) {
    return encrypt(password  + this.salt) == this.password;
};

let User = mongoose.model('users', UserSchema);

/* Adding actions for user */
let jwt = require('jsonwebtoken');
let UsersActions = {
    login(req, res, next) {
        User.findOne({email: req.body.email}, function (err, user) {
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

            var data = user.toObject();
            data.token = jwt.sign(data, config.secret, {expiresIn: 60 * 5});
            delete data.password;
            delete data.salt;
            res.json(data);
        });
    },

    register(req, res, next) {
        var cloudinaryConfig = {
            width: 200,
            height: 200,
            crop: 'fill'
        };

        function saveUser(avatarUrl) {
            User({email: user.email,
                password: user.password,
                username: user.username,
                avatar: avatarUrl}).save(function (err, user) {
                if (err) {
                    res.status('500');
                    res.json({code: err.code.toString()});
                } else {
                    var data = user.toObject();
                    data.token = jwt.sign(data, config.secret, {expiresIn: 60 * 5});
                    delete data.password;
                    delete data.salt;
                    res.json(data);
                }
            });
        }

        var user = req.body;
        if (req.files.file && req.files.file.path) {
            cloudinary.uploader.upload(
                req.files.file.path,
                function(result) {
                    try {
                        saveUser(result.secure_url);
                    } catch(e) {
                        res.json({code: err.code.toString()});
                    }
                }, cloudinaryConfig);
        } else {
            saveUser('');
        }

    },

    me(req, res, next) {
        let user = req.user;
        delete user.password;
        delete user.salt;
        res.send(user);
    }
};

module.exports = UsersActions;
