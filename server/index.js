'use strict';

const express = require('express');
var cors = require('cors')
var mongoose = require('mongoose');
const path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// configuration ===============================================================
mongoose.connect('mongodb://localhost:27017/userLog'); // connect to our database

const app = module.exports =  express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // read cookies
app.use(cors())

app.use(session({
  secret: 'instacar'
}));
const api = require('./routes/api')(app);

app.use('/', api);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});