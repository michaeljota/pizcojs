/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');
var uuid = require('node-uuid');

var Client = function(address){
    this.id = uuid.v4();
    this.name = '';
    this.address = address ? address :
        process.env.DOMAIN;
    this.connectionDate = new Date();
    this.color = '#000000';
};

var SketchpadManager = function(){
    this._storage = [];
    this._drawing = false;

    this.ResetStorage = function(room){
        this._storage = [];
        this._drawing = false;
        room.emit('syncer-remoteDrawing', this._drawing);
        room.emit('syncer-syncStorage', this._storage);
        room.emit('syncer-cancelDraw');
        room.emit('syncer-renderStorage');
    };

    this.Draw = function(room, shape){
        room.emit('syncer-draw', shape)
    };

    this.SaveShape = function(room, shape){
        this._storage.push(shape);
        room.emit('syncer-syncStorage', this._storage);
    };

    this.RenderStorage = function(room){
        room.emit('syncer-renderStorage');
    };

    this.SyncStorage = function(room){
        room.emit('syncer-syncStorage', this._storage);
        room.emit('syncer-remoteDrawing', this._drawing);
    };

    this.RemoteDrawing = function(room, active) {
        this._drawing = active;
        room.emit('syncer-remoteDrawing', this._drawing);
    };

    this.Refresh = function(room) {
        room.emit('syncer-refresh');
    }

};

var Room = function(name){
    this.name = name;
    this.sketchpad = new SketchpadManager();
    this.clients = [];
    this.config = {
        Share : false,
        Collaborate : false
    };
};

var rooms = [];
var users = [];

// When the user disconnects.. perform this
function onDisconnect(socket, user) {
    users.splice(users.indexOf(user),1);
    console.info('[%s] DISCONNECTED. Now %s users online', user.address, users.length);
}

// When the user connects.. perform this
function onConnect(socket, io, user) {
    // When the client emits 'info', this listens and executes
    socket.on('info', function (data) {
        console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
    });

    console.info('[%s] CONNECTED. Now %s users online', user.address, users.length);

    // Insert sockets below
    require ('../api/api.socket.js').register(io);
    require ('../api/classroom/shape.socket.js') (socket, io);
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
        var user = new Client(socket.handshake.address);
        users.push(user);
        var room;

        // Call onConnect.
        //Le pasamos el socket para que maneje las señales recibidas y el io para que responda a todos.
        onConnect(socket, io, user);

        // Call onDisconnect.
        socket.on('disconnect', function () {
            onDisconnect(socket, user);
        });

        //#region User data
        socket.on('login-update', function (data) {
            if(!data){
                socket.emit('login-fail');
                return;
            }
            user.name = data.name;
            //TODO: Set a random color to the user.
            console.info('[%s] is now know as %s', user.address, user.name);
            socket.emit('login-success', user);
        });
        //#endregion

        /*socket.on('syncer-draw', function (shape){
            sketchpad.Draw(io.sockets.in(user.room), shape);
        });

        socket.on('syncer-refresh', function(){
            sketchpad.Refresh(io.sockets.in(user.room));
        });

        socket.on('syncer-saveShape', function (shape){
            sketchpad.SaveShape(io.sockets.in(user.room), shape);
        });

        socket.on('syncer-renderStorage', function (){
            sketchpad.RenderStorage(io.sockets.in(user.room));
        });

        socket.on('syncer-resetShapeStorage', function (){
            sketchpad.ResetStorage(io.sockets.in(user.room));
        });

        socket.on('syncer-remoteDrawing', function (active) {
            sketchpad.RemoteDrawing(socket.broadcast.in(user.room), active);
        });

        socket.on('syncer-syncPlease', function(){
            socket.emit('syncStorage', sketchpad._storage);
            socket.emit('renderStorage');
        });

        /*socket.on('updateUser', function (user){
            for(var i=0; i<rooms.length; i++){
                if(user.Room == rooms[i].name){
                    console.log('User: '+user.Name+' joined: '+user.Room);
                    sketchpad = rooms[i].sketchpad;
                    user.name = user.Name;
                    socket.leave(user.room);
                    user.room = user.Room;
                    socket.join(user.room);
                    socket.emit('userUpdated');
                    return;
                }
            }
            console.log('User: '+user.Name+' created: '+user.Room);
            var j = rooms.push (new Room(user.Room));
            sketchpad = rooms[j-1].sketchpad;
            user.name = user.Name;
            socket.leave(user.room);
            user.room = user.Room;
            socket.join(user.room);
            socket.emit('userUpdated');
        });*/
    });
};
