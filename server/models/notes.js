'use strict';

let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
let conString = require('../config').conString;

let notes = {
    create(req, res, next) {
        MongoClient.connect(conString, (err, db) => {
            if (err) return next(err);
            db.collection('notes').insertOne(req.body.fields || {}, (err, result) => {
                db.close();
                if (err) return next(err);
                res.status(200).json(result);
            });
        });
    },

    read(req, res, next) {
        MongoClient.connect(conString, (err, db) => {
            if (err) return next(err);
            let limit = Number(req.body.notesOnPage) || 1;
            let page = Number(req.body.page) || 1;
            let pages = 0;
            let result = {
                limit,
                notes: []
            };
            let id = req.params.id;
            let sort = req.body.order;
            let filters = Object.assign({}, req.body.filters);
            if (id) filters._id = ObjectId(id);

            db.collection('notes').find(filters).count((err, ct) => {
                if (err) return db.close(), next(err);
                pages = Math.ceil(ct/limit);
                page = page > pages || page < 0 ? 1 : page;
                result = Object.assign({}, result, {page, pages, ct});
                db
                    .collection('notes')
                    .find(filters)
                    .sort(sort)
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .each((err, doc) => {
                        if (err) return db.close(), next(err);
                        if (doc !== null) return result.notes.push(doc);
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
            db.collection('notes').updateOne({_id: ObjectId(id)}, req.body.fields || {}, (err, result) => {
                db.close();
                if (err) return next(err);
                res.status(200).json(result);
            });
        });
    },

    remove(req, res, next) {
        MongoClient.connect(conString, (err, db) => {
            if (err) return next(err);
            let id = req.params.id;
            if (!id) return next(new Error('Cannot delete record without id'));
            db.collection('notes').updateOne({_id: ObjectId(id)}, {isDel: true}, (err, result) => {
                db.close();
                if (err) return next(err);
                res.status(200).json(result);
            });
        });
    },

    delete(req, res, next) {
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

    populate(req, res, next) {
        MongoClient.connect(conString, (err, db) => {
            if (err) return next(err);
            db.collection('notes').insertMany([
                {
                    id: '1',
                    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Wien_-_Stephansdom_%281%29.JPG/800px-Wien_-_Stephansdom_%281%29.JPG',
                    text: 'Evidence has been found of continuous habitation since 500 BC, when the site of Vienna on the Danube River was settled by the Celts. In 15 BC, the Romans fortified the frontier city they called Vindobona to guard the empire against Germanic tribes to the north.',
                    title: 'Vienna',
                    userId: 'scolt',
                    subtitle: 'Wien',
                    lat: 48.2,
                    lng: 16.366667,
                    isDel: false,
                    isDraft: false,
                    updated: 1461529637199,
                    created: 1461529637199
                },
                {
                    id: '2',
                    text: 'The Republic of Venice was a major maritime power during the Middle Ages and Renaissance, and a staging area for the Crusades and the Battle of Lepanto, as well as a very important center of commerce (especially silk, grain, and spice) and art in the 13th century up to the end of the 17th century.',
                    title: 'Venice',
                    subtitle: 'Comune di Venezia',
                    userId: 'scolt',
                    lat: 45.4375,
                    lng: 12.335833,
                    isDel: false,
                    isDraft: false,
                    updated: 1461529637199,
                    created: 1461529637199
                },
                {
                    id: '3',
                    text: 'There is archaeological evidence of human occupation of the Rome area from approximately 14,000 years ago, but the dense layer of much younger debris obscures Palaeolithic and Neolithic sites',
                    title: 'Rome',
                    subtitle: 'Comune di Rome',
                    userId: 'scolt',
                    lat: 41.9,
                    lng: 12.5,
                    isDel: false,
                    isDraft: false,
                    updated: 1461529637199,
                    created: 1461529637199
                },
                {
                    id: '4',
                    text: 'Vatican City is distinct from the Holy See (Latin: Sancta Sedes),[g] which dates back to early Christianity and is the main episcopal see of 1.2 billion Latin and Eastern Catholic adherents around the globe.',
                    title: 'Vatican City',
                    subtitle: 'Città del Vaticano or, more formally, Stato della Città del Vaticano, meaning "Vatican City State"',
                    userId: 'scolt',
                    lat: 41.903333,
                    lng: 12.453333,
                    isDel: false,
                    isDraft: false,
                    updated: 1461529637199,
                    created: 1461529637199
                },
                {
                    id: '5',
                    text: 'Naples is one of the oldest continuously inhabited cities in the world. Bronze Age Greek settlements were established in the Naples area in the second millennium BC.',
                    title: 'Vatican City',
                    subtitle: 'Comune di Napoli',
                    userId: 'scolt',
                    lat: 40.833333,
                    lng: 14.25,
                    isDel: false,
                    isDraft: false,
                    updated: 1461529637199,
                    created: 1461529637199
                },
                {
                    id: '6',
                    text: 'Padua stands on the Bacchiglione River, 40 kilometres (25 miles) west of Venice and 29 km (18 miles) southeast of Vicenza. The Brenta River, which once ran through the city, still touches the northern districts. Its agricultural setting is the Venetian Plain (Pianura Veneta).',
                    title: 'Padua',
                    subtitle: 'Città di Padova',
                    userId: 'scolt',
                    lat: 45.416667,
                    lng: 11.866667,
                    isDel: false,
                    isDraft: false,
                    updated: 1461529637199,
                    created: 1461529637199
                },
                {
                    id: '7',
                    text: 'Bari is made up of four different urban sections.',
                    title: 'Bari',
                    subtitle: 'the via Sparano and via Argiro',
                    userId: 'scolt',
                    lat: 41.125278,
                    lng: 16.866667,
                    isDel: false,
                    isDraft: false,
                    updated: 1461529637199,
                    created: 1461529637199
                },
                {
                    id: '8',
                    text: 'The prosperity of the city was historically based on maritime trade; as the capital of the maritime Republic of Ragusa, it achieved a high level of development, particularly during the 15th and 16th centuries, as it became notable for its wealth and skilled diplomacy.',
                    title: 'Dubrovnik',
                    subtitle: 'Grad Dubrovnik',
                    userId: 'scolt',
                    lat: 42.640278,
                    lng: 18.108333,
                    isDel: false,
                    isDraft: false,
                    updated: 1461529637199,
                    created: 1461529637199
                },
                {
                    id: '9',
                    text: 'The national park was founded in 1949 and is situated in the mountainous karst area of central Croatia, at the border to Bosnia and Herzegovina. The important north-south road connection, which passes through the national park area, connects the Croatian inland with the Adriatic coastal region.',
                    title: 'Plitvice Lakes National Park',
                    subtitle: 'Croatian: Nacionalni park Plitvička jezera',
                    userId: 'scolt',
                    lat: 44.880556,
                    lng: 15.616111,
                    isDel: false,
                    isDraft: false,
                    updated: 1461529637199,
                    created: 1461529637199
                },
                {
                    id: '10',
                    text: 'There is vast archaeological evidence that places Budva among the oldest urban settlements of the Adriatic coast. Substantial documentary evidence provides historical references dating back to the 5th century BC.',
                    title: 'Budva',
                    subtitle: 'In Serbian the town is known as Будва or Budva; in Italian as Budua; in Albanian as "Budua and in Greek as Μπούντβα (Budva).',
                    userId: 'scolt',
                    lat: 42.288056,
                    lng: 18.8425,
                    isDel: false,
                    isDraft: false,
                    updated: 1461529637199,
                    created: 1461529637199
                },
                {
                    id: '11',
                    text: 'The city has grown from a Stone Age settlement to Poland\'s second most important city. It began as a hamlet on Wawel Hill and was already being reported as a busy trading centre of Slavonic Europe in 965.',
                    title: 'Krakow',
                    subtitle: 'Royal Capital City of Kraków Stołeczne Królewskie Miasto Kraków',
                    userId: 'scolt',
                    lat: 50.066667,
                    lng: 19.933333,
                    isDel: false,
                    isDraft: false,
                    updated: 1461529637199,
                    created: 1461529637199
                },
                {
                    id: '12',
                    text: 'Budapest has a humid continental climate (Dfb), according to the Köppen climate classification system, with relatively cold winters and warm summers.[79] Winter (November until early March) can be cold and the city receives little sunshine. Snowfall is fairly frequent in most years, and nighttime temperatures of −10 °C (14 °F) are not uncommon between mid-December and mid-February.',
                    title: 'Budapest',
                    subtitle: 'Budapest főváros',
                    userId: 'scolt',
                    lat: 47.4925,
                    lng: 19.051389,
                    isDel: false,
                    isDraft: false,
                    updated: 1461529637199,
                    created: 1461529637199
                },
                {
                    id: '13',
                    text: 'Through the latest glacial period, about 18,000-29,000 years ago, the area of Braslav Lakes was covered with vast ice fields, up to several hundred metres thick. As the climate warmed, the ice slowly melted and the limit of the ice moved north. This complex process shaped the characteristic features of the nature of Poozerye with its hilly relief and lakes.',
                    title: 'Braslaw Lakes',
                    subtitle: ' Braslawskiya azyory',
                    userId: 'scolt',
                    lat: 55.596111,
                    lng: 27.053889,
                    isDel: false,
                    isDraft: false,
                    updated: 1461529637199,
                    created: 1461529637199
                }
            ], (err, result) => {
                db.close();
                if (err) return next(err);
                res.status(200).json(result);
            });
        });
    }
};

module.exports = notes;
