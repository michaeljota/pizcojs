(function() {
  'use strict';

  angular
    .module('pizcojs')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    var deregistrationCallback = $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          event.preventDefault();
          $location.path('/login');
        }
      });
    });

    $rootScope.$on('$destroy', deregistrationCallback)
  }

})();
