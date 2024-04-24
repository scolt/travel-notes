'use strict';

const config = require('./server/config');
const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multipart = require('connect-multiparty');
const http = require('http');
const server = http.createServer(app);
const port = config.port;
const restApi = require('./server/restApi');
const expressJwt = require('express-jwt');
const cors = require('cors');

require('mongoose').connect(config.db.mongo);
require('cloudinary').config(config.cloudinaryConfig);

app
    .use ( cors({
        exposedHeaders: ['tn-user-type']
    }) )
    .use ( compression() )
    .use ( bodyParser.json() )
    .use ( cookieParser() )
    .use ( multipart() )
    .set ( 'views', `${__dirname}/server/views`)
    .set ( 'view engine', 'jade')
    .use ( express.static(__dirname + '/dist'))
    .use ( '/restApi', expressJwt({secret: config.secret, credentialsRequired: false}))
    .all ( '/restApi/:model.:ext/:action/:id?', restApi)
    .get ( '*.html', (req, res) => {
        req.session.ct ? req.session.ct++ : (req.session.ct = 1);
        console.log(req.session.ct);
        res.redirect('index.html#/404');
    })
    .all ( '*', (req, res, next) => next(new Error('Service not exists')))
    .use ( (err, req, res, next) => {
        console.log(err, req.url);
        res.status(200).json({err: err.toString()})
    });

server.listen(port, () => {console.log(`${new Date()} Listening at ${port}`);});
