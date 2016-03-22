(function(){
  'use strict';

  angular
    .module('pizcojs')
    .config(MainRoute);

  function MainRoute($stateProvider) {
    $stateProvider
      .state('app.main', {
        url: '/main',
        views: {
          'content@app': {
            templateUrl: 'app/main/main.html'
          },
          'live@app.main': {
            templateUrl: 'app/live/live.html',
            controller: 'LiveController',
            controllerAs: 'vm'
          },
          'saved@app.main': {
            templateUrl: 'app/saved/saved.html',
            controller: 'SavedController',
            controllerAs: 'vm'
          }
        }
      });
  }
})();
