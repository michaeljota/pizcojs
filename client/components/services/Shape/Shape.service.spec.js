'use strict';

describe('Service: Shape', function () {

  // load the service's module
  beforeEach(module('tesisApp'));

  // instantiate service
  var Shape;
  beforeEach(inject(function (_Shape_) {
    Shape = _Shape_;
  }));

  it('should do something', function () {
    expect(!!Shape).toBe(true);
  });

});
