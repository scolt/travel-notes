'use strict';

let models = {
    notes: require('./models/notes'),
    users: require('./models/users'),
    tags: require('./models/tags'),
    comments: require('./models/comments')
};

// method all
// path /restApi/:model.:ext/:action/:id?
function restApi(req, res, next) {
    let model = req.params.model;
    let action = req.params.action;

    let type = 'logged';
    if (!req.user) type = req.header('Authorization') && req.header('Authorization').includes('Bearer') ? 'expired' : 'guest';
    res.header('tn-user-type', type);

    if (!models[model] || !models[model][action]) return next(new Error('Service or action not extists'));
    models[model][action](req, res, next);
}

module.exports = restApi;
