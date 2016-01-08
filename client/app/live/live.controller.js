'use strict';

angular.module('tesisApp')
    .controller('LiveCtrl', function ($scope, $mdDialog) {
        var cards = [];

        cards.push ({
            title: 'Prueba',
            img: 'assets/canvas-testing.png',
            name: 'room',
            owner: 'Michael',
            creationDate: new Date(),
            clientsConnected: 1
        });

        cards.push ({
            title: 'Prueba',
            img: 'assets/canvas-testing.png',
            name: 'room',
            owner: 'Michael',
            creationDate: new Date(),
            clientsConnected: 1
        });

        cards.push ({
            title: 'Prueba',
            img: 'assets/canvas-testing.png',
            name: 'room',
            owner: 'Michael',
            creationDate: new Date(),
            clientsConnected: 1
        });

        $scope.cards = cards;

        $scope.enterRoom = function (room) {
            //TODO: Esto debería ingresar a la sala y dejar al usuario en la pantalla de dibujo.
            console.log('Entering in %s', room);
        };

        $scope.showInfo = function (room, ev) {
            $mdDialog.show ({
                templateUrl: 'app/roomInfo/roomInfo.html',
                controller: 'roomInfoCtrl',
                locals: {
                    room: room
                },
                clickOutsideToClose:true,
                targetEvent: ev
            })
        };

        function showCustomGreeting($event) {
            $mdDialog.show({
                targetEvent: $event,
                template: '<md-dialog>' +
                '  <md-content>Hello {{ employee }}!</md-content>' +
                '  <div class="md-actions">' +
                '    <md-button ng-click="closeDialog()">' +
                '      Close Greeting' +
                '    </md-button>' +
                '  </div>' +
                '</md-dialog>',
                controller: 'GreetingController',
                onComplete: afterShowAnimation,
                locals: {employee: $scope.userName}
            });
        }
    });
