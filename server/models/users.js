'use strict';

/* Declare DB model for User entity */
let mongoose = require('mongoose');
let crypto = require('crypto');
let config = require('../config');
let Schema = mongoose.Schema;
let UserSchema = new Schema({
    imageId: String,
    firstName: String,
    lastName: String,
    isAdmin: Boolean,
    isModerator: Boolean,
    isDel: Boolean,
    isBan: Boolean,
    email: {type: String, unique: true},
    password: String,
    username: {type: String, unique: true},
    text: String,
    salt: String
});

let ImageSchema = new Schema({
    preview: String,
    image: String,
    isDel: Boolean,
    alt: String,
    lng: Number,
    lat: Number
});

let cloudinary = require('cloudinary');

function encrypt(text){
    var cipher = crypto.createCipher(config.algorithm, config.password);
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
}

UserSchema.pre('save', function(next) {
    this.salt = crypto.randomBytes(256).toString('hex');
    this.password = encrypt(this.password + this.salt);
    this.role = 'user';
    next();
});

UserSchema.methods.validPassword = function(password) {
    return encrypt(password  + this.salt) == this.password;
};

let User = mongoose.model('users', UserSchema);
let Image = mongoose.model('image', ImageSchema);

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
            delete data.password;
            delete data.salt;
            data.token = jwt.sign(data, config.secret, {expiresIn: 60 * 5});
            Image.findOne({
                '_id': data.imageId
            }, function (err, image) {
                if (image) {
                    data.avatar = image.image;
                }
                res.json(data);
            });
        });
    },

    read(req, res, next) {
        User.findOne({username: req.body.userId}, function (err, user) {
            if (err) {
                res.status(500);
                res.send('Unexpected error');
                return;
            }
            if (!user) {
                res.status(404);
                res.send('This user doesn\'t exist');
                return;
            } else {
                var data = user.toObject();
                delete data.password;
                delete data.salt;

                if (req.user && req.user.username === user.username) {
                    data.owner = true;
                }

                res.json(data);
            }
        });
    },

    create(req, res, next) {
        var cloudinaryConfig = {
            width: 200,
            height: 200,
            crop: 'fill'
        };

        var user = req.body;

        function saveUser(avatarUrl) {
            Image({
                image: avatarUrl
            }).save(function (err, image) {
                if (err) {
                    res.status('500');
                    res.json({code: err.code.toString()});
                } else {
                    var dataImage = image.toObject();
                    user.imageId = dataImage['_id'];
                    User(user).save(function (err, user) {
                        if (err) {
                            res.status('500');
                            res.json({code: err.code.toString()});
                        } else {
                            var data = user.toObject();
                            data.token = jwt.sign(data, config.secret, {expiresIn: 60 * 60 * 24});
                            data.avatar = dataImage.image;
                            delete data.password;
                            delete data.salt;
                            res.json(data);
                        }
                    });
                }
            });

        }

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

    update(req, res, next) {
        if (req.user && req.body['_id'] === req.user['_id']) {
            User.update({
                _id: req.body['_id']
            }, {
                email: req.body.email
            }, {}, function (err, doc) {
                if (!err && doc) {
                    User.findOne({
                        _id: req.body['_id']
                    }, function (err, user) {
                        let data = user.toObject();
                        data.owner = true;
                        delete data.password;
                        delete data.salt;
                        res.json(data);
                    })
                } else {
                    res.status(500);
                }
            })
        } else {
            res.status(401).end('Not authorized');
        }
    },

    ping(req, res, next) {
        if (req.user) {
            let user = req.user;

            delete user.password;
            delete user.salt;
            Image.findOne({
                '_id': req.user.imageId
            }, function (err, image) {
                if (image) {
                    user.avatar = image.image;
                }
                res.send(user);
            });
        } else {
            res.status(401).end('Not authorized');
        }

    }
};

module.exports = UsersActions;
