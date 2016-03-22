'use strict';

let express = require('express'), router = express.Router();
let User = require('../../../models/User');
let jwt = require('jsonwebtoken');
let config = require('../../../config');

router.post('/login', function (req, res) {
    User.findOne({email: req.body.username}, function (err, user) {
        if (err) {
            res.status(500);
            res.send('Unexpected error');
            return;
        }
        if (!user) {
            res.status(401);
            res.send('Incorrect login or password');
            return;
        }
        if (!user.validPassword(req.body.password)) {
            res.status(401);
            res.send('Incorrect login or password');
            return;
        }
        var token = jwt.sign(user, config.secret, {expiresIn: 60 * 5});
        res.json({token: token});
    });
});

router.post('/register', function (req, res) {
    try {
        User({email: req.body.email,
              password: req.body.password,
              username: req.body.username}).save(function (err, user) {
            if (err) {
                res.status('500');
                res.json({code: err.code.toString()});
            } else {
                var token = jwt.sign(user, config.secret, {expiresIn: 60 * 5});
                res.json({token: token});
            }
        });
    } catch(e) {
        console.log(e.toString);
    }
});

router.post('/logout', function (req, res) {
    req.logOut();
    res.send(200);
});
module.exports = router;
