'use strict';

describe('Directive: embedSrc', function () {

  // load the directive's module
  beforeEach(module('engApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<embed-src></embed-src>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the embedSrc directive');
  }));
});
