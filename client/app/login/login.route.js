(function(){
  'use strict';

  angular
    .module('pizcojs')
    .config(LoginRoute);

  function LoginRoute($stateProvider) {
    $stateProvider
      .state('app.login', {
        url: '/login',
        views: {
          'content@app': {
            templateUrl: 'app/login/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
          }
        }
      });
  }

})();
