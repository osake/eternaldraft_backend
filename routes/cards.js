'use strict';

const Card = require('./../lib/card');
const CardModel = require('./../models/card');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  CardModel.findById(1, function(err, card) {
    res.json(card);
  });
});

module.exports = router;
