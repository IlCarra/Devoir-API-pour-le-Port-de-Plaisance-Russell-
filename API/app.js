require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'dev'}` });
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catwayRouter = require('./routes/catway');
const mongodb = require('./db/mongo');

mongodb.initClientDbConnection();

var app = express();

app.use(cors({
    exposerHeaders: ['Authorisation'],
    origin: '*' 
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/users-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'user.html'));
});

app.get('/catways-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'catway.html'));
});
app.get('/catways/:id/reservations-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reservation.html'));
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catways', catwayRouter);

app.use(function(req, res, next) {
    res.status(404).json({name: 'API', version: '1.0', status: '404', message: 'not_found'})
});

module.exports = app;
