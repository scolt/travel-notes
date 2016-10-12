'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let config = require('../config');
let cloudinary = require('cloudinary');

let NoteSchema = new Schema({
    id: Number,
    photo: String,
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
        data.photo = image;
        data.userId = user;
        Note.create(data, (err, note) => {
            cb(err, note);
        })
    }

    return {
        create(req, res, next) {
            const files = req.files;
            const body = req.body;
            const user = req.user.username;

            if (files.file && files.file.path) {
                cloudinary.uploader.upload(
                    files.file.path,
                    function(result) {
                        saveNote(body, user, result.secure_url, dispatch(res, next));
                    });
            } else {
                saveNote(body, user, '', dispatch(res, next));
            }
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
                var query = Note
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

