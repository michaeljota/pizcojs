'use strict';

angular.module('tesisApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.main', {
                url: '^/main',
                parent: 'app',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/main.html'
                    },
                    'live@app.main': {
                        templateUrl: 'app/live/live.html',
                        controller: 'LiveCtrl'
                    },
                    'saved@app.main': {
                        templateUrl: 'app/saved/saved.html',
                        controller: 'SavedCtrl'
                    }
                }
            });
    });
