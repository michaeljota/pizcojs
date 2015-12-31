'use strict';

angular.module('tesisApp')
  .service('Enums', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

        var Colors = Object.freeze({
            BLACK:       '#000000',
            GREY:        '#676767'
        });

        var Tool = Object.freeze({
            PENCIL : 0,
            LINE : 1,
            RECTANGLE : 2,
            CIRCLE : 3,

            properties : {
                0: {name: 'pencil', value: 0, code: 'P'},
                1: {name: 'line', value: 1, code: 'L'},
                2: {name: 'rectangle', value: 2, code: 'R'},
                3: {name: 'circle', value: 3, code: 'C'}
            }
        });

        return {
            COLORS  : Colors,
            TOOLS   : Tool
        }
  });
