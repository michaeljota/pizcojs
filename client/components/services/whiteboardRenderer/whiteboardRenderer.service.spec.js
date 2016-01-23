'use strict';

describe('Service: whiteboardRenderer', function () {

  // load the service's module
  beforeEach(module('tesisApp'));

  // instantiate service
  var whiteboardRenderer;
  beforeEach(inject(function (_whiteboardRenderer_) {
    whiteboardRenderer = _whiteboardRenderer_;
  }));

  it('should do something', function () {
    expect(!!whiteboardRenderer).toBe(true);
  });

});
