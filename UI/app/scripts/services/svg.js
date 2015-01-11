'use strict';

/**
 * @ngdoc service
 * @name engApp.Svg
 * @description
 * # Svg
 * Service in the engApp.
 */
angular.module('geoApp')
  .service('Svg', function () {
    return {
      getCenter: function (svgElm) {
        var bbox = svgElm.getBBox();
        return {
                 x: Math.floor(bbox.x + bbox.width / 2.0),
                 y: Math.floor(bbox.y + bbox.height / 2.0)
               };
      }
    }
  });
