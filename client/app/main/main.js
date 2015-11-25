'use strict';

angular.module('tesisApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/sketchpad',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
