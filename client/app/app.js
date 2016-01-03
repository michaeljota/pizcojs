'use strict';

angular.module('tesisApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'btford.socket-io',
    'ngMaterial',
    'ngAnimate',
    'ngAria'
])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $mdIconProvider, $mdThemingProvider) {
        $urlRouterProvider
            .otherwise('/login');

        $locationProvider.html5Mode(true);

        $mdIconProvider
            .defaultIconSet('./assets/icons/mdi.svg');

        $mdThemingProvider.theme('default')
            .primaryPalette('deep-purple')
            .accentPalette('blue');
    });
