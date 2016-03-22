'use strict';

let config = {
    port: process.env.PORT || 1337,
    conString: process.env.MONGOLAB_URI || 'mongodb://heroku_2h4w74hv:g5g2q4esmicnm46p8n6prl44sh@ds013599.mlab.com:13599/heroku_2h4w74hv'
};

module.exports = config;