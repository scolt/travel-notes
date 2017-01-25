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
    website: String,
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
                res.json(data);
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
            const images = [];
            delete req.body._id;

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
                User(dataToSave).save((err, doc) => {
                    if (err) {
                        next(err);
                        return;
                    }
                    doc = doc.toObject();
                    delete doc.password;
                    delete doc.salt;
                    doc.token = jwt.sign(doc, config.secret, {expiresIn: config.sessionExpiration});
                    res.json(doc);
                });
            });
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
                        doc = doc.toObject();
                        doc.owner = true;
                        delete doc.password;
                        delete doc.salt;
                        doc.token = jwt.sign(doc, config.secret, {expiresIn: config.sessionExpiration});

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
