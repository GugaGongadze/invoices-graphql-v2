const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const schema = require('./schema/schema');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');


const app = express();
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));
const MONGO_URI =
  'mongodb://guga:guga123@ds127961.mlab.com:27961/vobi-invoices';

mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'aaabbbccc',
    store: new MongoStore({
      url: MONGO_URI,
      autoReconnect: true
    })
  })
);

// app.use(session({ secret: 'supasecret' }));
app.use(passport.initialize());
app.use(passport.session());



app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public', '/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

module.exports = app;
