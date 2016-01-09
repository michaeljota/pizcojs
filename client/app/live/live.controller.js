'use strict';

angular.module('tesisApp')
    .controller('LiveCtrl', function ($scope, $mdDialog) {
        var cards = [];

        cards.push ({
            title: 'Prueba',
            img: '../assets/img/blank_square.svg',
            name: 'room',
            owner: 'Michael',
            creationDate: new Date(),
            clientsConnected: 1
        });

        cards.push ({
            title: 'Prueba',
            img: '../assets/img/blank_square.svg',
            name: 'room',
            owner: 'Michael',
            creationDate: new Date(),
            clientsConnected: 1
        });

        cards.push ({
            title: 'Prueba',
            img: '../assets/img/blank_square.svg',
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

        $scope.createRoom = function (ev) {
            $mdDialog.show ({
                templateUrl: 'app/roomCreation/roomCreation.html',
                controller: 'roomCreationCtrl',
                clickOutsideToClose:true,
                targetEvent: ev
            })
            .then(function (room) {
                //TODO: Enviar la información al servidor para que el servidor cree la sala y luego ingrese al usuario en ella.
                var alert = $mdDialog.alert()
                    .title('Testing')
                    .content('This looks fine: '+room.name)
                    .ok('Close');
                $mdDialog
                    .show( alert )
                    .finally(function() {
                        alert = undefined;
                    });
            })
        }
    });
