'use strict';

let config = {
    port: process.env.PORT || 1337,
    conString: process.env.MONGOLAB_URI || 'mongodb://heroku_2h4w74hv:g5g2q4esmicnm46p8n6prl44sh@ds013599.mlab.com:13599/heroku_2h4w74hv',
    secret: 'this is my super secret key, tsss',
    algorithm: 'aes-256-ctr',
    password: 'realStrangePassword',
    cloudinaryConfig: {
        cloud_name: 'scolt',
        api_key: '337694711715748',
        api_secret: 'hbzZ2mzdbGJwg9gtW-qMcZpM9w8'
    }
};

module.exports = config;
