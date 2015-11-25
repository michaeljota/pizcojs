'use strict';

angular.module('tesisApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('modalLogin', {
        url: '/',
        templateUrl: 'app/modalLogin/modalLogin.html',
        controller: 'ModalLoginCtrl'
      });
  });
