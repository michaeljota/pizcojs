/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');

var Client = function(address){
    this.name = "";
    this.address = address !== null || address !== undefined ?
        address.address + ':' + address.port :
        process.env.DOMAIN;
    this.connectionDate = new Date();
    this.room = "/";
};

var rooms = {
    room : 'room'
};

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
        room.emit('remoteDrawing', this.drawing);
        room.emit('syncShapeStorage', this.storage);
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
        // Call onConnect.
        onConnect(socket);

        var client = new Client(socket.handshake.address);
        client.room = rooms[rooms.room];
        socket.join(rooms.room);

        console.info('[%s] CONNECTED TO ROOM: %s', client.address, client.room);

        // Call onDisconnect.
        socket.on('disconnect', function () {
            onDisconnect(socket);
            console.info('[%s] DISCONNECTED (ROOM: %s)', client.address, client.room);
        });

        socket.on('draw', function(shape){
            //socket.emit('draw', shape);
            io.sockets.in(client.room).emit('draw', shape);
        });

        socket.on('saveShape', function(shape){
            sketchpad.storage.push(shape);
            io.sockets.in(client.room).emit('syncShapeStorage', sketchpad.storage);
        });

        socket.on('renderShapeStorage', function(){
            io.sockets.in(client.room).emit('renderShapeStorage');
        });

        socket.on('resetShapeStorage', function(){
            sketchpad.resetStorage(io.sockets.in(client.room));
        });

        socket.on('remoteDrawing', function(active) {
            sketchpad.drawing = active;
            io.sockets.in(client.room).emit('remoteDrawing', sketchpad.drawing);
        });

        io.sockets.in(client.room).emit('syncShapeStorage', sketchpad.storage);
        io.sockets.in(client.room).emit('remoteDrawing', sketchpad.drawing);
    });
};
