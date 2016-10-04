'use strict';
var express = require('express');
var app = express();
var parser = require('body-parser');
var path = require('path');
var userRoute = require('./server/routes/user');

app.use(parser.urlencoded({
  extended: true
}));

app.use(parser.json());

app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '/public')));

var router = express.Router();
app.use('/api', router);

router.get('/', (req, res) => {
  res.status(200).json({
    'welcome': 'Hello World'
  });
});

userRoute(router);

app.use((req, res) => {
  return res.sendFile(__dirname + '/public/index.html');
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening at http://localhost:' + port);
module.exports = app;
