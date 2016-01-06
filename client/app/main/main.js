'use strict';

angular.module('tesisApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.main', {
                url: '^/main',
                parent: 'app',
                abstract: true,
                views: {
                    'content@app': {
                        templateUrl: 'app/main/main.html',
                        controller: 'MainCtrl'
                    }
                }
            });
    });
