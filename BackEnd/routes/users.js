var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const authenticate = require('../authenticate');
const Users = require('../models/users');

router.use(bodyParser.json());

router.post('/signup', (req, res, next) => {
    Users.register(new Users({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ message: err.message || 'Falha no registro' });
        } else {
            const token = authenticate.getToken({ _id: user._id });
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, token: token });
        }
    });
});

router.post('/login', async (req, res) => {
    try {
        const user = await Users.findOne({ username: req.body.username });

        if (!user || (await user.authenticate(req.body.password)).user === false) {
            return res.status(401).json({ message: 'Usuário ou senha incorretos!' });
        }

        const token = authenticate.getToken({ _id: user._id });

        res.status(200).json({ username: user.username, id: user._id, token: token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/logout', (req, res) => {
    res.status(200).json({ message: "Deslogado com sucesso!" });
});

module.exports = router;