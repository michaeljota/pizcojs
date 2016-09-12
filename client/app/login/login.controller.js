(function(){
  'use strict';

  angular
    .module('pizcojs')
    .controller('LoginController', LoginController);

  function LoginController($state, Auth) {
    var vm = this;

    vm.checkEnter = function (keyEvent) {
      if(keyEvent.which === 13){
        vm.login();
      }
    };

    vm.user = {
      name: ''
    };

    vm.login = function () {
      if(!vm.user.name) {
        return;
      }
      Auth.createUser({
        username: vm.user.name,
        password: ''
      })
      .then(function() {
        // Account created, redirect to home
        $state.go('app.main');
      })
      .catch(function(err) {
        console.error(err);
      });
    };
  }
})();
