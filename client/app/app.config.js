(function() {
  'use strict';

  angular
    .module('pizcojs')
    .config(config)
    .config(materialConfig)
    .config(html5Mode);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
  }

  /** @ngInject */
  function materialConfig ($mdIconProvider, $mdThemingProvider) {

    $mdIconProvider
      .defaultIconSet('./assets/icons/mdi.svg');

    $mdThemingProvider.theme('default')
      .primaryPalette('deep-purple')
      .accentPalette('blue');
  }

  function html5Mode ($locationProvider) {
    $locationProvider.html5Mode(true);
  }


})();
