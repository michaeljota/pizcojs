/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');

var Client = function(address){
    this.name = "";
    this.address = address !== null ?
        address.address + ':' + address.port :
        process.env.DOMAIN;
    this.connectionDate = new Date();
    this.room = "/";
};

var rooms = [];

var SketchpadManager = function(){
    this.clients = {};
    this.storage = [];
    this.config = {
        share : false,
        colaborate : false,
        locastore : false
    };
    this.drawing = false;

    this.resetStorage = function(room){
        this.storage = [];
        this.drawing = false;
        room.emit('remoteDrawing', remoteDrawing);
        room.emit('syncShapeStorage', shapeStorage);
        room.emit('cancelDraw');
    }

};

var sketchpad = new SketchpadManager();

// When the user disconnects.. perform this
function onDisconnect(socket) {

}

// When the user connects.. perform this
function onConnect(socket) {
    // When the client emits 'info', this listens and executes
    socket.on('info', function (data) {
        console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
    });

    // Insert sockets below
    //require('../api/thing/thing.socket').register(socket);
}

module.exports = function (io) {
    // socket.io (v1.x.x) is powered by debug.
    // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
    //
    // ex: DEBUG: "http*,socket.io:socket"

    // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
    //
    // 1. You will need to send the token in `client/components/socket/socket.service.js`
    //
    // 2. Require authentication here:
    // socketio.use(require('socketio-jwt').authorize({
    //   secret: config.secrets.session,
    //   handshake: true
    // }));

    io.on('connection', function (socket) {
        var client = new Client(socket.handshake.address);

        // Call onConnect.
        onConnect(socket);
        console.info('[%s] CONNECTED', client.address);

        // Call onDisconnect.
        socket.on('disconnect', function () {
            onDisconnect(socket);
            console.info('[%s] DISCONNECTED', client.address);
        });

        socket.on('draw', function(shape){
            console.info('[%s] DRAWING', client.address);
            io.sockets.in(client.room).emit('draw', shape);
        });

        socket.on('saveShape', function(shape){
            sketchpad.storage.push(shape);
            socket.broadcast.emit('syncShapeStorage', sketchpad.storage);
        });

        socket.on('renderShapeStorage', function(){
            console.log('[%s] RENDERING', client.address);
            socket.broadcast.emit('renderShapeStorage');
        });

        socket.on('resetShapeStorage', function(){
            sketchpad.resetStorage(socket.to(client.room));
        });

        socket.on('remoteDrawing', function(active) {
            sketchpad.drawing = true;
            socket.broadcast.emit('remoteDrawing', sketchpad.drawing);
        });

        socket.broadcast.emit('syncShapeStorage', sketchpad.storage);
        socket.broadcast.emit('remoteDrawing', sketchpad.drawing);
    });
};
