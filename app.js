'use strict';

let express = require('express');
let app = express();
let compression = require('compression');
let bodyParser = require('body-parser');
let http = require('http');
let server = http.createServer(app);
let config = require('./server/config');
let port = config.port;
let restApi = require('./server/restApi');
let expressJwt = require('express-jwt');
let mongoose = require('mongoose');

/*For access to methods from another domains */
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', '*');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'accept, content-type, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var db = mongoose.connect(config.conString);

app.use ( compression() );
app.use ( bodyParser.json() );
app.set ( 'views', `${__dirname}/server/views`);
app.set ( 'view engine', 'jade');
app.use ( express.static(__dirname + '/public'));

/*example of defeated route*/
let defeatedRoutes = [
    '/restApi/user.json/me'
];
for (var i = 0; i < defeatedRoutes.length; i++) {
    app.use(defeatedRoutes[i], expressJwt({secret: config.secret}));
}


app.all ( '/restApi/:model.:ext/:action/:id?', restApi);
app.get ( '*', (req, res) => res.redirect('index.html#/404'));
app.all ( '*', (req, res) => res.status(505).json({err: 'Service not exists'}));
app.use ( (err, req, res, next) => res.status(200).json({err: err.message}));




server.listen(port, () => {console.log(`${new Date()} Listening at ${port}`);});
