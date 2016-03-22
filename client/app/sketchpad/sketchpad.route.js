(function(){
  'use strict';

  angular
    .module('pizcojs')
    .config(SketchpadRoute);

  function SketchpadRoute($stateProvider) {
    $stateProvider
      .state('app.sketchpad', {
        url: '/sketchpad/:classroomId',
        parent: 'app',
        views: {
          'content@app': {
            templateUrl: 'app/sketchpad/sketchpad.html',
            controller: 'SketchpadController',
            controllerAs: 'vm'
          }
        }
      });
  }
})();
