(function() {
  'use strict';

  angular
    .module('pizcojs')
    .config(authConfig)
    .factory('authInterceptor', authInterceptor);

  function authConfig($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  }

  function authInterceptor($rootScope, $q, $window, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          delete $window.sessionStorage.token;
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  }

})();
