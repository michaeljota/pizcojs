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
        collaborate : false,
        localstorage : false
    };
    this.drawing = false;

    this.resetStorage = function(room){
        this.storage = [];
        this.drawing = false;
        room.emit('remoteDrawing', this.drawing);
        room.emit('syncShapeStorage', this.storage);
        room.emit('cancelDraw');
    };

    this.Draw = function(room, shape){
        room.emit('draw', shape)
    };

    this.SaveShape = function(room, shape){
        this.storage.push(shape);
        room.emit('syncShapeStorage', this.storage);
    };

    this.RenderShapeStorage = function(room){
        room.emit('renderShapeStorage');
    };

    this.Start = function(room){
        room.emit('syncShapeStorage', sketchpad.storage);
        room.emit('remoteDrawing', sketchpad.drawing);
    };

    this.RemoteDrawing = function(room, active) {
        this.drawing = active;
        room.emit('remoteDrawing', sketchpad.drawing);
    };

};

var sketchpad = new SketchpadManager();

// When the user disconnects.. perform this
function onDisconnect(socket, client) {
    console.info('[%s] DISCONNECTED (ROOM: %s)', client.address, client.room);
}

// When the user connects.. perform this
function onConnect(socket, client) {
    // When the client emits 'info', this listens and executes
    socket.on('info', function (data) {
        console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
    });

    console.info('[%s] CONNECTED TO ROOM: %s', client.address, client.room);

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
        client.room = rooms[rooms.room];
        socket.join(rooms.room);

        sketchpad.Start(io.sockets.in(client.room));

        // Call onConnect.
        onConnect(socket, client);

        // Call onDisconnect.
        socket.on('disconnect', function () {
            onDisconnect(socket, client);
        });

        socket.on('draw', function (shape){
            sketchpad.Draw(io.sockets.in(client.room), shape);
        });

        socket.on('saveShape', function (shape){
            sketchpad.SaveShape(io.sockets.in(client.room), shape);
        });

        socket.on('renderShapeStorage', function (){
            sketchpad.RenderShapeStorage(io.sockets.in(client.room));
        });

        socket.on('resetShapeStorage', function (){
            sketchpad.resetStorage(io.sockets.in(client.room));
        });

        socket.on('remoteDrawing', function (active) {
            sketchpad.RemoteDrawing(io.sockets.in(client.room), active);
        });

        socket.on('updateUser', function (user){
            client.name = user.Name;
            client.room = user.Room;
            socket.emit('userUpdated');
        });
    });
};
