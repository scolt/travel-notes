'use strict';

const config = {
    // GUIDE: SET PORT FOR THE BACK, 80 or 443 for production
    port: process.env.PORT || 1337,
    db: {
        mongo: process.env.MONGOLAB_URI
    },
    defaultDb: 'mongo',
    secret: 'this is my super secret key, tsss',
    sessionExpiration: '2d',
    algorithm: 'aes-256-ctr',
    password: 'realStrangePassword',
    cloudinaryConfig: {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
    },
    dateFormat: 'dd.mm.yyyy hh24:mi:ss',
    limit: 59,
    maxAge: 31557600000 // One year
};

module.exports = config;
