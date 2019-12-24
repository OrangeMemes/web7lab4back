var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var favoritesRouter = require('./routes/favorites');
var weatherRouter = require('./routes/weather');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/favorites', favoritesRouter);
app.use('/api/weather', weatherRouter);

module.exports = app;
