/**
 * Socket.io configuration
 */

'use strict';

const config = require('./environment');

let users = 0;

// When the user connects.. perform this
function onConnect(io, socket, address) {
  users++;
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
      console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  console.info('[%s] CONNECTED. Now %s users online', address, users);

  // Insert sockets below
  require ('../app/socket.js').register(io);
  require ('../app/whiteboard/whiteboard.socket.js') (io, socket);
  require ('../app/room/room.socket.js') (io, socket);
  require ('../app/shape/shape.socket.js') (io, socket);
  //require('../api/thing/thing.socket').register(socket);
}

// When the user disconnects.. perform this
function onDisconnect(socket, address) {
  users--;
  console.info('[%s] DISCONNECTED. Now %s users online', address, users);
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
    //Le pasamos el socket para que maneje las señales recibidas y el io para que responda a todos.
    onConnect(io, socket, socket.handshake.address);

    // Call onDisconnect.
    socket.on('disconnect', function () {
        onDisconnect(socket, socket.handshake.address);
    });
  });
};
