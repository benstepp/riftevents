//modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var socketio = require('socket.io');
var http = require('http');

//config
var port = process.env.PORT || 80;
var env = process.env.NODE_ENV || 'development';

//Execute app
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(morgan());

var server = http.Server(app, env);
var io = socketio(server);

//app modules
var riftevents = require('./app/riftevents/main')(app);

//io.on('connection', function(socket) {
	//socket.emit('news', {hello: 'world'});
//});

//start app
app.listen(port);
console.log('Now listening on port: '+ port);
exports = module.exports = app;