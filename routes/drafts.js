'use strict';

const express = require('express');
const router = express.Router();

const Draft = require('../lib/draft');

router.get('/', function (req, res, next) {
});

router.post('/', function (req, res, next) {
  const draft = new Draft();
  res.json(draft);
});

router.put('/', function (req, res, next) {
});

module.exports = router;
