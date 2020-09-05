const express = require('express');
const app = express()
const api = require('../api')
const bodyParser = require('body-parser');

app.use(function (req, res, next) {
  var allowedOrigins = ['http://localhost:3000'];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, PUT, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('./src/assets/upload'));
app.use('/demo', api);
module.exports = app;