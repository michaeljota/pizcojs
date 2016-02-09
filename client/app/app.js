'use strict';

var app = angular.module('tesisApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'btford.socket-io',
    'ngMaterial',
    'ngAnimate',
    'ngAria',
    'ngLodash'
]);

/*UI Router Config*/
app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){
    $urlRouterProvider
        .otherwise('/login');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $window, $location) {
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
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          event.preventDefault();
          $location.path('/login');
        }
      });
    });
  });


/*Angular Material Config*/
app.config(function ($mdIconProvider, $mdThemingProvider) {

    $mdIconProvider
        .defaultIconSet('./assets/icons/mdi.svg');

    $mdThemingProvider.theme('default')
        .primaryPalette('deep-purple')
        .accentPalette('blue');
});
