'use strict';

angular.module('tesisApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id', {
      id: '@_id'
    },
    {
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	});
  });
