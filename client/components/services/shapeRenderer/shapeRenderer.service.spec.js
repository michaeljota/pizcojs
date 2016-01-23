'use strict';

describe('Service: shapeRenderer', function () {

  // load the service's module
  beforeEach(module('tesisApp'));

  // instantiate service
  var shapeRenderer;
  beforeEach(inject(function (_shapeRenderer_) {
    shapeRenderer = _shapeRenderer_;
  }));

  it('should do something', function () {
    expect(!!shapeRenderer).toBe(true);
  });

});
