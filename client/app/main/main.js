'use strict';

angular.module('tesisApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.main', {
                url: '/main',
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl'
            });
    });
