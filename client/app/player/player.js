'use strict';

angular.module('tesisApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.player', {
        url: '/player',
        templateUrl: 'app/player/player.html',
        controller: 'PlayerCtrl'
      });
  });
