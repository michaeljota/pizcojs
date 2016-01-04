'use strict';

angular.module('tesisApp')
    .controller('LiveCtrl', function ($scope) {
        var cards = [];

        cards.push ({
            title: 'Prueba',
            img: 'http://etc.usf.edu/clipart/40600/40690/pb_sq_40690_lg.gif',
            room: 'room',
            faved: false
        });

        cards.push ({
            title: 'Prueba',
            img: 'http://etc.usf.edu/clipart/40600/40690/pb_sq_40690_lg.gif',
            room: 'room',
            faved: false
        });

        cards.push ({
            title: 'Prueba',
            img: 'http://etc.usf.edu/clipart/40600/40690/pb_sq_40690_lg.gif',
            room: 'room',
            faved: false
        });

        $scope.cards = cards;

        $scope.enterRoom = function (room) {
            console.log('Entering in %s', room);
        };

        $scope.setFaved = function (card) {
            card.faved = !card.faved;
        };
    });
