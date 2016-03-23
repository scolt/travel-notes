'use strict';

let express = require('express');
let app = express();
let compression = require('compression');
let bodyParser = require('body-parser');
let http = require('http');
let server = http.createServer(app);
let port = require('./server/config').port;
let restApi = require('./server/restApi');

app
    .use ( compression() )
    .use ( bodyParser.json() )
    .set ( 'views', `${__dirname}/server/views`)
    .set ( 'view engine', 'jade')
    .use ( express.static(__dirname + '/public'))
    .all ( '/restApi/:model.:ext/:action/:id?', restApi)
    .get ( '*', (req, res) => res.redirect('index.html#/404'))
    .all ( '*', (req, res) => res.status(200).json({err: 'Service not exists'}))
    .use ( (err, req, res, next) => res.status(200).json({err: err.message}));

server.listen(port, () => {console.log(`${new Date()} Listening at ${port}`);});
