(function(){
  'use strict';

  angular
    .module('pizcojs')
    .factory('User', UserModel);

  function UserModel($resource) {
    return $resource('/api/users/:id', {
      id: '@_id'
    },{
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  }
})();
