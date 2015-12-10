'use strict';

describe('Service: Drawer', function () {

  // load the service's module
  beforeEach(module('tesisApp'));

  // instantiate service
  var Drawer;
  beforeEach(inject(function (_Drawer_) {
    Drawer = _Drawer_;
  }));

  it('should do something', function () {
    expect(!!Drawer).toBe(true);
  });

});
