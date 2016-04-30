'use strict';

const config = {
    port: process.env.PORT || 1337,
    db: {
        mongo: process.env.MONGOLAB_URI || 'mongodb://heroku_2h4w74hv:g5g2q4esmicnm46p8n6prl44sh@ds013599.mlab.com:13599/heroku_2h4w74hv',
        pg:  process.env.DATABASE_URL || 'postgres://srdlnsniotkpwy:BgHDnPC6TlDps9p6kf-lMoMSZ3@ec2-54-228-246-19.eu-west-1.compute.amazonaws.com:5432/d8r4uniu82cds9' + '?ssl=true',
        redis: process.env.REDIS_URL || 'redis://h:p1e4njelbacpr6bo59eetldaemj@ec2-46-137-82-111.eu-west-1.compute.amazonaws.com:25159'
    },
    defaultDb: 'mongo',
    secret: 'this is my super secret key, tsss',
    algorithm: 'aes-256-ctr',
    password: 'realStrangePassword',
    cloudinaryConfig: {
        cloud_name: 'scolt',
        api_key: '337694711715748',
        api_secret: 'hbzZ2mzdbGJwg9gtW-qMcZpM9w8'
    },
    dateFormat: 'dd.mm.yyyy hh24:mi:ss',
    limit: 100,
    maxAge: 31557600000 // One year
};

module.exports = config;
