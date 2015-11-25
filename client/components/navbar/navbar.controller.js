'use strict';

angular.module('tesisApp')
    .controller('NavbarCtrl', function ($scope, $location, User) {

        $scope.User = User;

        $scope.menu = [
            {
                'title': 'Login',
                'link': '/'
            },
            {
                'title': 'Sketchpad',
                'link' : '/sketchpad'
            }
        ];

        $scope.isCollapsed = true;

        $scope.isActive = function(route) {
            return route === $location.path();
        };
    });
