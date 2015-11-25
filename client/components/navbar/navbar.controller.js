'use strict';

angular.module('tesisApp')
    .controller('NavbarCtrl', function ($scope, $location, User) {

        $scope.User = User;

        $scope.menu = [
            {
                'title': 'Home',
                'link': '/'
            },
            {
                'title': 'Login',
                'link' : '/login'
            }
        ];

        $scope.isCollapsed = true;

        $scope.isActive = function(route) {
            return route === $location.path();
        };
    });
