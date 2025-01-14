var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const authenticate = require('../authenticate');
const Users = require('../models/users');

router.use(bodyParser.json());

router.post('/signup', (req, res, next) => {
    Users.register(new Users({username: req.body.username}),
    req.body.password, (err, user) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({message: err.message || 'Falha no registro'});
        } else {
            passport.authenticate('local')(req, res, () => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: true});
            });
        }
    });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({username: req.user.username, id: req.user._id, token: token})
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.status(200);
        res.json({message: "Deslogado com sucesso!"});
    } else {
        var err = new Error("Você não está logado!");
        err.status = 403;
        next(err);
    }
});

module.exports = router;