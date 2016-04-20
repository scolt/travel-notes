'use strict';

let config = require('./server/config');
let express = require('express');
let app = express();
let compression = require('compression');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let RedisStore = require('connect-redis')(session);
let expressSession = session({
    store: new RedisStore({url: config.redisUrl}),
    secret: config.secret,
    cookie: { maxAge: config.maxAge },
    resave: false,
    saveUninitialized: true
});
let multipart = require('connect-multiparty');
let http = require('http');
let server = http.createServer(app);
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
    .use ( cookieParser() )
    .use ( expressSession )
    .use ( multipart() )
    .set ( 'views', `${__dirname}/server/views`)
    .set ( 'view engine', 'jade')
    .use ( express.static(__dirname + '/public'))
    .use ( '/restApi', expressJwt({secret: config.secret, credentialsRequired: false}))
    .all ( '/restApi/:model.:ext/:action/:id?', restApi)
    .get ( '*.html', (req, res) => {
        req.session.ct ? req.session.ct++ : (req.session.ct = 1);
        console.log(req.session.ct);
        res.redirect('index.html#/404');
    })
    .all ( '*', (req, res, next) => next(new Error('Service not exists')))
    .use ( (err, req, res, next) => res.status(200).json({err: err.message}));

server.listen(port, () => {console.log(`${new Date()} Listening at ${port}`);});
