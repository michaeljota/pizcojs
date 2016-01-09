'use strict';

angular.module('tesisApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('app', {
                url: '/',
                abstract: true,
                views: {
                    '' : {
                        templateUrl: 'app/root/root.html'
                    },
                    'sidenav@app': {
                        templateUrl: 'components/sidenav/sidenav.html',
                        controller: 'SidenavCtrl'
                    },
                    'toolbar@app': {
                        templateUrl: 'components/toolbar/toolbar.html',
                        controller: 'ToolbarCtrl'
                    }
                }
            });
    });
