'use strict';

describe('Controller: ModalLoginCtrl', function () {

  // load the controller's module
  beforeEach(module('tesisApp'));

  var ModalLoginCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModalLoginCtrl = $controller('ModalLoginCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
