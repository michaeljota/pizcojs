'use strict';

describe('Service: Syncer', function () {

  // load the service's module
  beforeEach(module('tesisApp'));

  // instantiate service
  var Syncer;
  beforeEach(inject(function (_Syncer_) {
    Syncer = _Syncer_;
  }));

  it('should do something', function () {
    expect(!!Syncer).toBe(true);
  });

});
