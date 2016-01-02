'use strict';

describe('Directive: menuToggle', function () {

  // load the directive's module and view
  beforeEach(module('tesisApp'));
  beforeEach(module('components/directives/menuToggle/menuToggle.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<menu-toggle></menu-toggle>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the menuToggle directive');
  }));
});