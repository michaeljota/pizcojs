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

var SketchpadManager = function(){
    this._clients = {};
    this._storage = [];
    this._drawing = false;
    this._config = {
        Share : false,
        Collaborate : false,
        LocalStorage : false
    };

    this.ResetStorage = function(room){
        this._storage = [];
        this._drawing = false;
        room.emit('remoteDrawing', this._drawing);
        room.emit('syncStorage', this._storage);
        room.emit('cancelDraw');
        room.emit('renderStorage');
    };

    this.Draw = function(room, shape){
        room.emit('draw', shape)
    };

    this.SaveShape = function(room, shape){
        this._storage.push(shape);
        room.emit('syncStorage', this._storage);
    };

    this.RenderStorage = function(room){
        room.emit('renderStorage');
    };

    this.SyncStorage = function(room){
        room.emit('syncStorage', this._storage);
        room.emit('remoteDrawing', this._drawing);
    };

    this.RemoteDrawing = function(room, active) {
        this._drawing = active;
        room.emit('remoteDrawing', this._drawing);
    };

    this.Refresh = function(room) {
        room.emit('refresh');
    }

};

var Room = function(name){
    this.name = name;
    this.sketchpad = new SketchpadManager();
};

var rooms = [];

rooms.push(new Room('room'));


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
        var sketchpad;

        client.room = rooms[0].name;
        sketchpad = rooms[0].sketchpad;
        socket.join(client.room);

        // Call onConnect.
        onConnect(socket, client);

        // Call onDisconnect.
        socket.on('disconnect', function () {
            onDisconnect(socket, client);
        });

        socket.on('draw', function (shape){
            sketchpad.Draw(io.sockets.in(client.room), shape);
        });

        socket.on('refresh', function(){
            sketchpad.Refresh(io.sockets.in(client.room));
        });

        socket.on('saveShape', function (shape){
            sketchpad.SaveShape(io.sockets.in(client.room), shape);
        });

        socket.on('renderStorage', function (){
            sketchpad.RenderStorage(io.sockets.in(client.room));
        });

        socket.on('resetShapeStorage', function (){
            sketchpad.ResetStorage(io.sockets.in(client.room));
        });

        socket.on('remoteDrawing', function (active) {
            sketchpad.RemoteDrawing(io.sockets.in(client.room), active);
        });

        socket.on('syncPlease', function(){
            socket.emit('syncStorage', sketchpad._storage);
            socket.emit('renderStorage');
        });

        socket.on('updateUser', function (user){
            for(var i=0; i<rooms.length; i++){
                if(user.Room == rooms[i].name){
                    console.log('User: '+user.Name+' joined: '+user.Room);
                    sketchpad = rooms[i].sketchpad;
                    client.name = user.Name;
                    socket.leave(client.room);
                    client.room = user.Room;
                    socket.join(client.room);
                    socket.emit('userUpdated');
                    return;
                }
            }
            console.log('User: '+user.Name+' created: '+user.Room);
            var j = rooms.push (new Room(user.Room));
            sketchpad = rooms[j-1].sketchpad;
            client.name = user.Name;
            socket.leave(client.room);
            client.room = user.Room;
            socket.join(client.room);
            socket.emit('userUpdated');
        });
    });
};
