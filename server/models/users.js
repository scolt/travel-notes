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
    about: String,
    avatar: String,
    background: String,
    birthday: String,
    gender: String,
    skype: String,
    salt: String
});

let cloudinary = require('cloudinary');

function encrypt(text) {
    const cipher = crypto.createCipher(config.algorithm, config.password);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

UserSchema.pre('save', function (next) {
    this.salt = crypto.randomBytes(256).toString('hex');
    this.password = encrypt(this.password + this.salt);
    this.role = 'user';
    next();
});

UserSchema.methods.validPassword = function (password) {
    return encrypt(password + this.salt) == this.password;
};

let User = mongoose.model('users', UserSchema);

/* Adding actions for user */
let jwt = require('jsonwebtoken');

function clearUnexpectedFields(data) {
    for (let item in data) {
        if (data.hasOwnProperty(item))
            if (UserSchema.tree[item] === undefined) delete data[item];
    }
    return data;
}

/**
 * files = {file: String, name: FieldName, config: CloudinaryConfig}
 * */
function uploadImages(files, callback) {
    if (files.length === 0) {
        callback({})
    } else {
        const results = {};
        let totalFiles = files.length;

        files.forEach(item => {
            cloudinary.uploader.upload(
                item.file,
                (image) => {
                    results[item.name] = image.secure_url;
                    if (--totalFiles <= 0) callback(results);
                }, item.config);
        })
    }
}

let UsersActions = {
        login(req, res, next) {
            User.findOne({email: req.body.email}, function (err, user) {
                res.header('tn-user-type', 'guest');
                if (err) return next(err);
                if (!user) return next('This user doesn\'t exist');
                if (!user.validPassword(req.body.password)) return next('Incorrect login or password');

                const data = user.toObject();
                delete data.password;
                delete data.salt;
                data.token = jwt.sign(data, config.secret, {expiresIn: config.sessionExpiration});
                res.header('tn-user-type', 'logged');
                if (data.imageId) {
                    Image.findOne({
                        '_id': data.imageId
                    }, function (err, image) {
                        if (image) {
                            data.avatar = image.image;
                        }
                        res.json(data);
                    });
                } else {
                    res.json(data);
                }
            });
        },

        read(req, res, next) {
            const id = req.body.id || req.params.id;
            User.findOne({username: id}, function (err, user) {
                    if (err) return next(err);
                    if (!user) return next('This user doesn\'t exist');
                    const data = user.toObject();
                    delete data.password;
                    delete data.salt;

                    if (req.user && req.user.username === user.username) data.owner = true;
                    res.json(data);
                }
            );
        },

        create(req, res, next) {
            const cloudinaryConfig = {
                width: 200,
                height: 200,
                crop: 'fill'
            };

            const user = req.body;

            function saveUser(avatarUrl) {
                Image({
                    image: avatarUrl,
                    type: 'avatar'
                }).save(function (err, image) {
                    if (err) {
                        res.status('500');
                        res.json({code: err.code.toString()});
                    } else {
                        let dataImage = image.toObject();
                        user.imageId = dataImage['_id'];
                        User(user).save(function (err, user) {
                            if (err) {
                                res.status('500');
                                res.json({code: err.code.toString()});
                            } else {
                                let data = user.toObject();
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
                    function (result) {
                        try {
                            saveUser(result.secure_url);
                        } catch (e) {
                            res.json({code: err.code.toString()});
                        }
                    }, cloudinaryConfig);
            } else {
                saveUser('');
            }

        },

        update(req, res, next) {
            if (req.user && req.body['_id'] === req.user['_id']) {
                const images = [];
                if (req.files.avatar && req.files.avatar.path) images.push({
                    name: 'avatar',
                    file: req.files.avatar.path,
                    config: {
                        width: 200,
                        height: 200,
                        crop: 'fill'
                    }
                });

                if (req.files.background && req.files.background.path) images.push({
                    name: 'background',
                    file: req.files.background.path,
                    config: {
                        width: 800,
                        height: 140,
                        crop: 'crop'
                    }
                });

                uploadImages(images, (imgUrls) => {
                    let dataToSave = Object.assign({}, req.body, imgUrls);
                    dataToSave = clearUnexpectedFields(dataToSave);
                    User.findByIdAndUpdate(req.body['_id'], dataToSave, {new: true}, (err, doc) => {
                        if (err) {
                            next(err);
                            return;
                        }
                        delete doc.password;
                        delete doc.salt;
                        res.json(doc);
                    });
                });
            } else {
                return next('User doesn\'t have permissions for change this profile');
            }
        },

        ping(req, res, next) {
            if (req.user) {
                let user = req.user;
                delete user.password;
                delete user.salt;
                res.json(user);
            } else {
                res.status(401).end('Not authorized');
            }

        }
    }
    ;

module.exports = UsersActions;
