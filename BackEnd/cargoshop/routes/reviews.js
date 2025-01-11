var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const Reviews = require('../models/reviews').default;
var authenticate = require('../authenticate');

router.use(bodyParser.json());

/* GET users listing. */
router.route('/')
.get(authenticate.verifyUser, async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const review = await Reviews.find({});
    res.statusCode = 200;
    res.json(review);
  } catch(err) {
      console.log(err)
      res.statusCode = 404;
      res.json({});
  };
})
.post(authenticate.verifyUser, async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const review = await Reviews.create(req.body);
    res.statusCode = 200;
    res.json(review);
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
    const review = await Reviews.findById(req.params.id);
    if (review != null) {
      res.statusCode = 200;
      res.json(review);
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
    const review = await Reviews.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {
      new: true
    })
    res.statusCode = 200;
    res.json(review);
  } catch(err) {
      console.log(err)
      res.statusCode = 404;
      res.json({});
  };
})
.delete(authenticate.verifyUser, async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const response = await Reviews.findByIdAndDelete(req.params.id)
    console.log(response);
    res.statusCode = 200;
    res.json(response);
  } catch(err) {
      console.log(err)
      res.statusCode = 404;
      res.json({});
  }
});

module.exports = router;