'use strict';

describe('Controller: LiveCtrl', function () {

  // load the controller's module
  beforeEach(module('tesisApp'));

  var LiveCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LiveCtrl = $controller('LiveCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
