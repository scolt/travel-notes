'use strict';

let conString = require('../config').db.pg;
let dateFormat = require('../config').dateFormat;
let pg = require('pg');
let async = require('async');

function pgConnect(cb) {
    pg.connect(conString, cb);
};

function begin(client, done, cb) {
    client.query('Begin', err => cb(err, client, done));
};

function read(client, done, cb) {
    let text = `
        With a As ( Select Count(1) Over() As ct, id From comments
            Where 1=1 And Lower("text") Like '%' || Lower($1) || '%'
            Order By id asc
            Limit $2 Offset $3)
        Select "text", to_char(created, '${dateFormat}') As created, to_char(updated, '${dateFormat}') updated From comments
            Where id In(Select id from a)
    `;
    let values = ['2', 10, 0];
    client.query({text, values}, (err, result) => cb(err, client, done, result));
};

let comments = {
    sql(req, res, next) {
        pg.connect(conString, (err, client, done) => {
            if (err) return next(err);
            client.query(req.body.sql || '', (err, result) => {
                done();
                if(err) return next(err);
                res.status(200).json(result);
            });
        });
    },

    read(req, res, next) {
        pg.connect(conString, (err, client, done) => {
            if (err) return next(err);
            client.query('Begin', err => {
                if (err) return done(), next(err);
                let text = `
                    With a As ( Select Count(1) Over() As ct, id From comments
                        Where 1=1 And Lower("text") Like '%' || Lower($1) || '%'
                        Order By id asc
                        Limit $2 Offset $3)
                    Select "text", to_char(created, '${dateFormat}') As created, to_char(updated, '${dateFormat}') updated From comments
                        Where id In(Select id from a)
                `;
                let values = ['', 10, 0];
                client.query({text, values}, (err, result) => {
                    if(err) return done(), next(err);
                    client.query('Commit', done);
                    res.status(200).json(result.rows);
                });
            });
        });
    },

    readAsync(req, res, next) {
        async.waterfall([
            cb => pg.connect(conString, cb),
            (client, done, cb) => {
                client.query('Begin', err => cb(err, client, done));
            },
            (client, done, cb) => {
               let text = `
                    With a As ( Select Count(1) Over() As ct, id From comments
                        Where 1=1 And Lower("text") Like '%' || Lower($1) || '%'
                        Order By id asc
                        Limit $2 Offset $3)
                    Select "text", to_char(created, '${dateFormat}') As created, to_char(updated, '${dateFormat}') updated From comments
                        Where id In(Select id from a)
                `;
                let values = ['1', 10, 0];
                client.query({text, values}, (err, result) => cb(err, client, done, result));
            }
        ], (err, client, done, result) => {
            if (err) return done && done(), next(err);
            client.query('Commit', done);
            res.status(200).json(result.rows);
        });
    },

    readFin(req, res, next) {
        async.waterfall([
            pgConnect,
            begin,
            read
        ], (err, client, done, result) => {
            if (err) return done && done(), next(err);
            client.query('Commit', done);
            res.status(200).json(result.rows);
        });
    }
};

module.exports = comments;
