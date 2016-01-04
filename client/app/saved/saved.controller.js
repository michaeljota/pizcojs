'use strict';

angular.module('tesisApp')
  .controller('SavedCtrl', function ($scope) {
        var cards = [];

        cards.push ({
            title: 'Prueba',
            img: 'http://etc.usf.edu/clipart/40600/40690/pb_sq_40690_lg.gif',
            sketchpad: 'room',
            faved: false
        });

        cards.push ({
            title: 'Prueba',
            img: 'http://etc.usf.edu/clipart/40600/40690/pb_sq_40690_lg.gif',
            sketchpad: 'room',
            faved: false
        });

        cards.push ({
            title: 'Prueba',
            img: 'http://etc.usf.edu/clipart/40600/40690/pb_sq_40690_lg.gif',
            sketchpad: 'room',
            faved: false
        });

        $scope.cards = cards;

        $scope.playSketchpad = function (sketchpad) {
            console.log('Entering in %s', sketchpad);
        };

        $scope.setFaved = function (card) {
            card.faved = !card.faved;
        };
    });
