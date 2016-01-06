'use strict';

angular.module('tesisApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.player', {
                url: '^/player',
                parent: 'app',
                views: {
                    'content@app':{
                        templateUrl: 'app/player/player.html',
                        controller: 'PlayerCtrl'
                    }
                }
            });
    });
