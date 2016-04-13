'use strict';

let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
let conString = require('../config').conString;

let tags = {
    create(req, res, next) {
        MongoClient.connect(conString, (err, db) => {
            if (err) return next(err);
            db.collection('tags').insertOne(req.body.fields || {}, (err, result) => {
                db.close();
                if (err) return next(err);
                res.status(200).json(result);
            });
        });
    },

    read(req, res, next) {
        MongoClient.connect(conString, (err, db) => {
            if (err) return next(err);
            let rowsOnPage = Number(req.body.rowsOnPage) || 1;
            let page = Number(req.body.page) || 1;
            let pages = 0;
            let ct = 0;
            let result = {
                rowsOnPage,
                rows: []
            };
            let id = req.params.id;
            let sort = req.body.order;
            let filters = Object.assign({}, req.body.filters);
            if (id) filters._id = ObjectId(id);

            db.collection('tags').find(filters).count((err, ct) => {
                if (err) return db.close(), next(err);
                pages = Math.ceil(ct/rowsOnPage);
                page = page > pages || page < 0 ? 1 : page;
                result = Object.assign({}, result, {page, pages, ct});
                db
                    .collection('tags')
                    .find(filters)
                    .sort(sort)
                    .skip((page - 1) * rowsOnPage)
                    .limit(rowsOnPage)
                    .each((err, doc) => {
                        if (err) return db.close(), next(err);
                        if (doc !== null) return result.rows.push(doc);
                        db.close();
                        res.status(200).json(result);
                    });
            });
        });
    },

    update(req, res, next) {
        MongoClient.connect(conString, (err, db) => {
            if (err) return next(err);
            let id = req.params.id;
            if (!id) return next(new Error('Cannot update record without id'));
            db.collection('tags').updateOne({_id: ObjectId(id)}, req.body.fields || {}, (err, result) => {
                db.close();
                if (err) return next(err);
                res.status(200).json(result);
            });
        });
    },

    del(req, res, next) {
        MongoClient.connect(conString, (err, db) => {
            if (err) return next(err);
            let id = req.params.id;
            if (!id) return next(new Error('Cannot delete record without id'));
            db.collection('tags').deleteOne({_id: ObjectId(id)}, (err, result) => {
                db.close();
                if (err) return next(err);
                res.status(200).json(result);
            });
        });
    },

    populate(req, res, next) {
        MongoClient.connect(conString, (err, db) => {
            if (err) return next(err);
            db.collection('tags').insertMany([
                {
                    name: 'Minsk'
                },
                {
                    name: 'Gomel'
                },
                {
                    name: 'Bobruisk'
                },
                {
                    name: 'Lida'
                },
                {
                    name: 'Uzda'
                },
                {
                    name: 'Chicago'
                }
            ], (err, result) => {
                db.close();
                if (err) return next(err);
                res.status(200).json(result);
            });
        });
    },

    drop(req, res, next) {
        MongoClient.connect(conString, (err, db) => {
            if (err) return next(err);
            db.collection('tags').deleteMany({}, (err, result) => {
                db.close();
                if (err) return next(err);
                res.status(200).json(result);
            });
        });
    }
};

module.exports = tags;
