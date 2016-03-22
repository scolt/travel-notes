'use strict';

let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
let conString = require('../config').conString;

let notes = {
    create(req, res, next) {
        MongoClient.connect(conString, (err, db) => {
            if (err) return next(err);
            db.collection('notes').insertOne(req.body.note, (err, result) => {
                db.close();
                if (err) return next(err);
                res.status(200).json(result);
            });
        });
    },

    read(req, res, next) {
        MongoClient.connect(conString, (err, db) => {
            if (err) return next(err);
            let id = req.params.id;
            let result = [];
            let query = Object.assign({}, req.body.query);
            if (id) query._id = ObjectId(id);
            db.collection('notes').find(query).each((err, doc) => {
                if (err) return db.close(), next(err);
                if (doc !== null) return result.push(doc);
                db.close();
                res.status(200).json(result);
            });
        });
    },

    update(req, res, next) {
        MongoClient.connect(conString, (err, db) => {
            if (err) return next(err);
            let id = req.params.id;
            if (!id) return next(new Error('Cannot delete record without id'));
            db.collection('notes').deleteOne({_id: ObjectId(id)}, (err, result) => {
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
            db.collection('notes').updateOne({_id: ObjectId(id)}, {note: req.body.note}, (err, result) => {
                db.close();
                if (err) return next(err);
                res.status(200).json(result);
            });
        });
    },

    populate(req, res, next) {
        MongoClient.connect(conString, (err, db) => {
            if (err) return next(err);
            db.collection('notes').insertMany([
                {
                    id: '1',
                    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Wien_-_Stephansdom_%281%29.JPG/800px-Wien_-_Stephansdom_%281%29.JPG',
                    descr: 'Evidence has been found of continuous habitation since 500 BC, when the site of Vienna on the Danube River was settled by the Celts. In 15 BC, the Romans fortified the frontier city they called Vindobona to guard the empire against Germanic tribes to the north.',
                    title: 'Vienna',
                    userId: 'scolt',
                    subtitle: 'Wien',
                    position: {
                        lat: 48.2,
                        lng: 16.366667
                    }
                },
                {
                    id: '2',
                    descr: 'The Republic of Venice was a major maritime power during the Middle Ages and Renaissance, and a staging area for the Crusades and the Battle of Lepanto, as well as a very important center of commerce (especially silk, grain, and spice) and art in the 13th century up to the end of the 17th century.',
                    title: 'Venice',
                    subtitle: 'Comune di Venezia',
                    position: {
                        lat: 45.4375,
                        lng: 12.335833
                    }
                },
                {
                    id: '3',
                    photo: 'http://www.cornerstone-group.com/wp-content/uploads/2013/05/EMEA-athens.jpg',
                    descr: 'Athens is the capital and largest city of Greece. Athens dominates the Attica region and ' +
                    'is one of the worlds oldest cities, with its recorded history spanning around 3,400 years, and the ' +
                    'earliest human presence started somewhere between the 11th and 7th millennium BC',
                    title: 'Trip to Athens',
                    subtitle: 'The cradle of the European civilization',
                    position: {
                        lat: 37.9908164,
                        lng: 23.6682993
                    }
                },
                {
                    id: '4',
                    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/KeizersgrachtReguliersgrachtAmsterdam.jpg/1920px-KeizersgrachtReguliersgrachtAmsterdam.jpg',
                    descr: 'As the commercial capital of the Netherlands and one of the top financial centres in Europe, Amsterdam is considered an alpha world city by the Globalization and World Cities (GaWC) study group. The city is also the cultural capital of the Netherlands.',
                    title: 'Amsterdam',
                    subtitle: 'The city of bicycles and coffeeshops.',
                    position: {
                        lat: 52.366667,
                        lng: 4.9
                    }
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
            db.collection('notes').deleteMany({}, (err, result) => {
                db.close();
                if (err) return next(err);
                res.status(200).json(result);
            });
        });
    }
};

module.exports = notes;