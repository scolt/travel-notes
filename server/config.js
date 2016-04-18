'use strict';

let config = {
    port: process.env.PORT || 1337,
    conString: process.env.MONGOLAB_URI || 'mongodb://heroku_2h4w74hv:g5g2q4esmicnm46p8n6prl44sh@ds013599.mlab.com:13599/heroku_2h4w74hv',
    pgUrl: process.env.DATABASE_URL ||
        'postgres://srdlnsniotkpwy:BgHDnPC6TlDps9p6kf-lMoMSZ3@ec2-54-228-246-19.eu-west-1.compute.amazonaws.com:5432/d8r4uniu82cds9' + '?ssl=true',
    secret: 'this is my super secret key, tsss',
    algorithm: 'aes-256-ctr',
    password: 'realStrangePassword',
    cloudinaryConfig: {
        cloud_name: 'scolt',
        api_key: '337694711715748',
        api_secret: 'hbzZ2mzdbGJwg9gtW-qMcZpM9w8'
    },
    dateFormat: 'dd.mm.yyyy hh24:mi:ss'
};

module.exports = config;
