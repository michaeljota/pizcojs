/* global moment:false */
(function() {
  'use strict';

  angular
    .module('pizcojs')
    .constant('moment', moment)
    .constant('COLORS', {
      BLACK:      '#000000',
      GREY:       '#676767'
    })
    .constant('TOOLS', {
      PENCIL:     'pencil',
      LINE:       'line',
      RECTANGLE:  'rectangle',
      CIRCLE:     'circle'
    });

})();
