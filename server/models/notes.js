'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let config = require('../config');
let cloudinary = require('cloudinary');

let NoteSchema = new Schema({
    id: Number,
    photos: [],
    text: String,
    title: String,
    userId: String,
    subtitle: String,
    lat: Number,
    lng: Number,
    isDel: Boolean,
    isDraft: Boolean,
    updated: Number,
    created: Number
});

let Note = mongoose.model('notes', NoteSchema);

let NoteActions = (function () {
    function count(data, id, cb) {
        let limit = Number(data.limit) || config.limit;
        let page = Number(data.page) || 1;
        let pages = 0;
        const filters = Object.assign({
            isDel: false,
            isDraft: false
        }, data.filters);
        if (id) filters._id = id;

        let result = {
            total: 0,
            page,
            pages,
            limit,
            result: [],
        };

        Note.count({
            isDel: false,
            isDraft: false
        }, (err, total) => {
            if (err) {
                cb(err);
            } else {
                pages = Math.ceil(total/limit);
                page = page > pages || page < 0 ? 1 : page;
                result = Object.assign({}, result, {page, pages, total});
                cb(null, result);
            }
        });
    }

    function dispatch(res, next) {
        return (err, data) => {
            if (err) return next(err);
            res.status(200).json(data);
        }
    }

    function saveNote(data, user, image, cb) {
        data.photo = [image];
        data.userId = user;
        data.isDraft = false;
        data.isDel = false;
        Note.create(data, (err, note) => {
            cb(err, note);
        })
    }

    return {
        create(req, res, next) {
            const files = req.files;
            const body = req.body;
            const user = req.user && req.user.username;

            if (!user) {
                dispatch(res, next)('User doesn\'t have permissions for create new note')
            } else if (files.file && files.file.path) {
                cloudinary.uploader.upload(
                    files.file.path,
                    function(result) {
                        saveNote(body, user, result.secure_url, dispatch(res, next));
                    });
            } else {
                saveNote(body, user, '', dispatch(res, next));
            }
        },

        delete(req, res, next) {
            const id = req.body.id || req.params.id;
            if (!id) {
                dispatch(res, next)('Id not provided')
            } else {
                Note.update({
                    _id: id
                }, {isDel: true}, dispatch(res, next))
            }
        },

        addImage(req, res, next) {
            const files = req.files;
            const id = req.body.id;
            cloudinary.uploader.upload(
                files.file.path,
                (result) => {
                    Note.update({
                        "_id": id
                    }, {
                        "$push": {"photos" : result.secure_url}
                    }, (err) => {
                        if (err) {
                            dispatch(res, next)(err, null);
                        } else {
                            Note.find({"_id": id}).select('photos').exec((err, notes) => {
                                let data = {
                                    result: notes
                                };
                                dispatch(res, next)(err, data);
                            })
                        }

                    })
            });
        },

        read(req, res, next) {
            const data = req.body;
            const id = req.body.id || req.params.id;
            const order = data.order;
            const filters = Object.assign({
                isDel: false,
                isDraft: false
            }, data.filters);
            if (id) filters._id = id;

            count(req.body, id, (err, data) => {
                let query = Note
                    .find(filters)
                    .sort(order)
                    .skip((data.page - 1) * data.limit)
                    .limit(data.limit);

                query.exec((err, notes) => {
                    data.result = notes;
                    dispatch(res, next)(err, data);
                })
            })
        }
    }
})();

module.exports = NoteActions;

