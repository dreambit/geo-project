'use strict';

angular.module('engApp')
  .directive('dashboardNavigationBar', function () {
    return {
      templateUrl: 'views/components/dashboard-navigation-bar.html',
      restrict: 'E',
      scope: {
        active: '@active'
      }
    };
  });