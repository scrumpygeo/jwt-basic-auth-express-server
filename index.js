// Main starting point of the application
// pre es2016 way was require, eg:

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express(); // an instance of express
const router = require('./router');
const mongoose = require('mongoose');

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on('connected', function () {
  console.log('connected to db');
});

// App setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log(`Server listening on port ${port}`);
