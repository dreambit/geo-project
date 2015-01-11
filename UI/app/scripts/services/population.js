'use strict';

/**
 * @ngdoc service
 * @name geoApp.Population
 * @description
 * # Population
 * Service in the geoApp.
 */
angular.module('geoApp')
  .service('Population', function ($resource) {
    return $resource('/rest/population/:location/:period/');
  });