(function() {
  'use strict';

  angular
    .module('pizcojs')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '',
        abstract: true,
        views: {
          '' : {
            templateUrl: 'app/app.html'
          },
          'sidenav@app': {
            templateUrl: 'components/sidenav/sidenav.html',
            controller: 'SidenavController',
            controllerAs: 'snVm'
          },
          'toolbar@app': {
            templateUrl: 'components/toolbar/toolbar.html',
            controller: 'ToolbarController',
            controllerAs: 'tbVm'
          }
        }
      });

    $urlRouterProvider.otherwise('/login');
  }

})();
