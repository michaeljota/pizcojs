'use strict';

angular.module('tesisApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.login', {
                url: '^/login',
                parent: 'app',
                views: {
                    'content@app': {
                        templateUrl: 'app/login/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            });
    });
