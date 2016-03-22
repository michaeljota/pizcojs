(function() {
  'use strict';

  angular
    .module('pizcojs')
    .factory('Classroom', Classroom);

  function Classroom ($resource) {
    return $resource('/api/classrooms/:id/:controller', {
      id: '@_id'
    },{
      addWhiteboard: {
        method: 'POST',
        params: {
          controller: 'whiteboard'
        }
      }
    });
  }
})();
