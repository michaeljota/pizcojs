/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var camo = require('camo');
var config = require('./config/environment');
var path = require('path');
var passport = require('passport');

// Connect to datastorage
//camo.connect('nedb://'+path.join(__dirname, 'datastorage'))
camo.connect('nedb://memory')
    .then(function(db){
        console.info('Datastore started');
    })
    .catch(function(err){
        throw err;
    });

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server,{
  serveClient: (config.env!=='production'),
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./config/passport')(passport);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.info('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
