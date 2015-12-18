'use strict';

angular.module('tesisApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('modalLogin', {
        url: '/login',
        templateUrl: 'app/modalLogin/modalLogin.html',
        controller: 'ModalLoginCtrl'
      });
  });
