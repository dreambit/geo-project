'use strict';

angular.module('geoApp')
  .controller('MainCtrl', function ($scope) {

    $scope.showPopulation = {
      value: true
    };

    $scope.location = 'continents';

    $scope.quality = {
      value: false
    };
  });
