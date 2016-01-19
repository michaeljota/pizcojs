'use strict';

angular.module('tesisApp')
  .service('Enums', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

        var Colors = Object.freeze({
            BLACK:       '#000000',
            GREY:        '#676767'
        });

        var Tool = Object.freeze({
            PENCIL : 'pencil',
            LINE : 'line',
            RECTANGLE : 'rectangle',
            CIRCLE : 'circle'
        });

        return {
            COLORS  : Colors,
            TOOLS   : Tool
        };
  });
