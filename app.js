var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

const cards = require('./routes/cards');
const draftPacks = require('./routes/draft-packs');
const drafts = require('./routes/drafts');

var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/eternal');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/cards', cards);
app.use('/api/drafts', drafts);
app.use('/api/draft-packs', draftPacks);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
    stack: err.stack
  });
});

module.exports = app;
