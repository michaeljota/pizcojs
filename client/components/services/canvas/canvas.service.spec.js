'use strict';

describe('Service: canvas', function () {

  // load the service's module
  beforeEach(module('tesisApp'));

  // instantiate service
  var canvas;
  beforeEach(inject(function (_canvas_) {
    canvas = _canvas_;
  }));

  it('should do something', function () {
    expect(!!canvas).toBe(true);
  });

});
