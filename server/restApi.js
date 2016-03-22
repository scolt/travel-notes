'use strict';

let models = {
    notes: require('./models/notes'),
    users: require('./models/users')
};

// method all
// path /restApi/:model.:ext/:action/:id?
function restApi(req, res, next) {
    let model = req.params.model;
    let action = req.params.action;
    if (!models[model] || !models[model][action]) return next(new Error('Service or action not extists'));
    models[model][action](req, res, next);
};

module.exports = restApi;
