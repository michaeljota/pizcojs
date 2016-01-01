'use strict';

angular.module('tesisApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('sketchpad', {
        url: '/sketchpad',
        templateUrl: 'app/sketchpad/sketchpad.html',
        controller: 'SketchpadCtrl'
      });
  });