var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const authenticate = require('../authenticate');
const Users = require('../models/users').default;

router.use(bodyParser.json());

router.post('/signup', (req, res, next) => {
    Users.register(new Users({username: req.body.username}),
    req.body.password, (err, user) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: err});
        } else {
            passport.authenticate('local')(req, res, () => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: true, status: 'Registrado com sucesso!'});
            });
        }
    });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'Você entrou com sucesso!'})
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    } else {
        var err = new Error("Você não está logado!");
        err.status = 403;
        next(err);
    }
});

module.exports = router;