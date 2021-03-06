'use strict';

describe('Directive: bootstrapSwitch', function () {

  // load the directive's module
  beforeEach(module('geoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bootstrap-switch></bootstrap-switch>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the bootstrapSwitch directive');
  }));
});
