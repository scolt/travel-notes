'use strict';

let express = require('express');
let app = express();
let compression = require('compression');
let bodyParser = require('body-parser');
let multipart = require('connect-multiparty');
let http = require('http');
let server = http.createServer(app);
let config = require('./server/config');
let port = config.port;
let restApi = require('./server/restApi');
let expressJwt = require('express-jwt');
let mongoose = require('mongoose');
let cors = require('cors');

let cloudinary = require('cloudinary');
cloudinary.config(config.cloudinaryConfig);
mongoose.connect(config.conString);

app
    .use ( cors() )
    .use ( compression() )
    .use ( bodyParser.json() )
    .use ( multipart() )
    .set ( 'views', `${__dirname}/server/views`)
    .set ( 'view engine', 'jade')
    .use ( express.static(__dirname + '/public'))
    .use ( '/restApi', expressJwt({secret: config.secret, credentialsRequired: false}))
    .all ( '/restApi/:model.:ext/:action/:id?', restApi)
    .get ( '*.html', (req, res) => res.redirect('index.html#/404'))
    .all ( '*', (req, res) => res.status(505).json({err: 'Service not exists'}))
    .use ( (err, req, res, next) => res.status(200).json({err: err.message}));

server.listen(port, () => {console.log(`${new Date()} Listening at ${port}`);});
