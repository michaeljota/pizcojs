'use strict';

angular.module('tesisApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.main.live', {
        url: '/live',
        templateUrl: 'app/live/live.html',
        controller: 'LiveCtrl'
      });
  });
