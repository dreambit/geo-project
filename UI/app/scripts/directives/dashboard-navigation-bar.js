'use strict';

angular.module('geoApp')
.directive('dashboardNavigationBar', function () {
  return {
    templateUrl: 'views/components/dashboard-navigation-bar.html',
    restrict: 'E',
    scope: {
      active: '@',
      location: '=',
      quality: '='
    },
    link: function ($scope) {
      $scope.aside = {
        "title": "Settings",
        "content": "Quality"
      };
    }
  };
});