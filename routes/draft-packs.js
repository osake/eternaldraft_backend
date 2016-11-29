'use strict';

const DraftPack = require('../lib/draft-pack');
const Card = require('../lib/card');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var pack = new DraftPack([
    new Card(1, 'Test Card 1', '1', 'unit'),
    new Card(2, 'Test Card 2', '2', 'spell'),
    new Card(3, 'Test Card 3', '3', 'attachment'),
  ]);
  res.json(pack);
});

module.exports = router;
