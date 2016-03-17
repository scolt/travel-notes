'use strict';

let express = require('express');
let app = express();
let compression = require('compression');
let bodyParser = require('body-parser');
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 1337;
let version = require('./package.json').version;
let jadeOpts =  {
    pretty: true,
    version
};

app
    .use ( compression() )
    .use ( bodyParser.json() )
    .set ( 'views', `${__dirname}/server/views`)
    .set ( 'view engine', 'jade')
    .get ( '/', (req, res) => {
        res.status(200).render('index.jade', jadeOpts);
    })
    .post( '/restApi/table.json/read', (req, res) => {
        let id = req.body.page;
        setTimeout( () =>
            res.status(200).json({
                rows: [
                    {
                        id,
                        name: `Name ${id}`,
                        status: `Status ${id}`
                    }
                ]
            }), 3000);
    })
    .post( '/restApi/:model.:ext', (req, res) => {
        let model = req.params.model;
        let ext = req.params.ext;
        let item = {model, ext};
        console.log(item);
        res.status(200).json(item);
    })
    .use ( express.static(__dirname + '/public') )
    .get ( '*', (req, res) => {
        res.status(200).render('index.jade', jadeOpts);
    });

server.listen(port, () => {console.log(`${new Date()} Listening at ${port}`);});
