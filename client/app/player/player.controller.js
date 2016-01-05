'use strict';

angular.module('tesisApp')
  .controller('PlayerCtrl', function ($scope, Drawer) {
    var drawer = new Drawer(document.getElementById('canvasContainer'));
  });
