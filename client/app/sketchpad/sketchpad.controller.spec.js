'use strict';

describe('Controller: SketchpadCtrl', function () {

  // load the controller's module
  beforeEach(module('tesisApp'));

  var SketchpadCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SketchpadCtrl = $controller('SketchpadCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
