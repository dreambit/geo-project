'use strict';

describe('Directive: ConfigTool', function () {

  // load the directive's module
  beforeEach(module('geoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-config-tool></-config-tool>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ConfigTool directive');
  }));
});
