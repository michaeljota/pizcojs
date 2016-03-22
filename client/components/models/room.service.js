(function(){
  'use strict';

  angular
    .module('pizcojs')
    .factory('Room', Room);

  function Room($resource) {
    return $resource('/api/rooms/:id/:controller', {
      id: '@_id'
    },{
      enter: {
        method: 'POST',
        params: {
            controller: 'enter'
        }
      },
      addWhiteboard: {
        method: 'POST',
        params: {
            controller: 'addWhiteboard'
        }
      }
    });
  }
})();
