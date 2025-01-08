var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const Pedidos = require('../models/pedidos').default;
var authenticate = require('../authenticate');

router.use(bodyParser.json());

/* GET users listing. */
router.route('/')
.get(authenticate.verifyUser, async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const pedido = await Pedidos.find({});
    res.statusCode = 200;
    res.json(pedido);
  } catch(err) {
      console.log(err)
      res.statusCode = 404;
      res.json({});
  };
})
.post(authenticate.verifyUser, async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const pedido = await Pedidos.create(req.body);
    res.statusCode = 200;
    res.json(pedido);
  } catch(err) {
      console.log(err)
      res.statusCode = 404;
      res.json({});
  };
});

router.route('/:id')
.get(authenticate.verifyUser, async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const pedido = await Pedidos.findById(req.params.id);
    if (pedido != null) {
      res.statusCode = 200;
      res.json(pedido);
    } else {
      let err = {};
      res.statusCode = 404;
      res.json(err);
    }
  } catch(err) {
      console.log(err)
      res.statusCode = 404;
      res.json({});
  };
})
.put(authenticate.verifyUser, async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const pedido = await Pedidos.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {
      new: true
    })
    res.statusCode = 200;
    res.json(pedido);
  } catch(err) {
      console.log(err)
      res.statusCode = 404;
      res.json({});
  };
})
.delete(authenticate.verifyUser, async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const response = await Pedidos.findByIdAndDelete(req.params.id)
    res.statusCode = 200;
    res.json(response.id);
  } catch(err) {
      console.log(err)
      res.statusCode = 404;
      res.json({});
  }
});

module.exports = router;