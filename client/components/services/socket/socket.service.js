/* global io */
(function(){
  'use strict';

  angular
    .module('pizcojs')
    .factory('socket', socket);

  function socket(socketFactory, lodash) {
    var _ = lodash;
    // socket.io now auto-configures its connection when we ommit a connection url
    var ioSocket = io('', {
      // Send auth token on connection, you will need to DI the Auth service above
      // 'query': 'token=' + Auth.getToken()
      path: '/socket.io-client'
    });

    var socket = socketFactory({
      ioSocket: ioSocket
    });

    function onEvent(model, event, cb) {
      cb = cb || angular.noop;
      socket.on(model+':'+event, cb);
    }

    function emitEvent(model, event, data) {
      data = data || {};
      socket.emit(model+':'+event, data);
    }

    /**
     * Register listeners to sync an array with updates on a model
     *
     * Takes the array we want to sync, the model name that socket updates are sent from,
     * and an optional callback function after new items are updated.
     *
     * @param {String} modelName
     * @param {Array} array
     * @param {Function} cb
     */
    function syncUpdates(modelName, array, cb) {
      cb = cb || angular.noop;

      /**
       * Syncs item creation/updates on 'model:saved'
       */
      socket.on(modelName + ':saved', function (item) {
        var oldItem = _.find(array, {_id: item._id});
        var index = array.indexOf(oldItem);
        var event = 'created';

        // replace oldItem if it exists
        // otherwise just add item to the collection
        if (oldItem) {
          array.splice(index, 1, item);
          event = 'updated';
        } else {
          array.push(item);
        }

        cb(event, item, array);
      });

      /**
       * Syncs removed items on 'model:deleted'
       */
      socket.on(modelName + ':deleted', function (item) {
        var event = 'deleted';
        _.remove(array, {_id: item._id});
        cb(event, item, array);
      });
    }

    /**
     * Removes listeners for a models updates on the socket
     *
     * @param modelName
     */
    function unsyncUpdates(modelName) {
      socket.removeAllListeners(modelName + ':save');
      socket.removeAllListeners(modelName + ':remove');
    }

    return {
      socket,
      syncUpdates,
      unsyncUpdates,
      onEvent,
      emitEvent
    };
  }
})();
