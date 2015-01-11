'use strict';

angular.module('geoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.location = "continents";
    $scope.quality = "Low";
    $scope.showPopulation = "true";
    $scope.tooltip = {
  "title": "Hello Tooltip<br />This is a multiline message!",
  "checked": true
};
  });
