'use strict';

/**
 * @ngdoc directive
 * @name engApp.directive:map
 * @description
 * # map
 */
 angular.module('geoApp')
 .directive('map', function ($timeout, Svg, $compile) {
  return {
    templateUrl: 'views/components/map.html',
    restrict: 'E',
    scope: {
      location: '=',
      quality: '=',
      showPopulation: '='
    },
    link: function ($scope, element) {
      var createUrl = function(location, quality) {
        return 'maps/' + (location || $scope.location) + (quality || $scope.quality) + '.svg';
      },

            /**

            */
            initPopulation = function () {
              var svg = d3.select(svgDocument).select("svg"),
              g = svg.select('g'),
              center;

              svg.selectAll(".land").each(function () {
                center = Svg.getCenter(this);
                g.append("circle").attr('cx', center.x)
                .attr('cy', center.y)
                .attr('class', 'population')
                .attr('fill-opacity', 0.5)
                .attr('r', Math.floor(Math.random() * 50) + 10)
                .attr('fill', '#eea638'); 
              });
            },

            /**

            */
            populationVisibility = function (visible) {
              var svg = d3.select(svgDocument).select("svg");

              svg.selectAll(".population").each(function () {
                d3.select(this).attr("visibility", visible ? 'visible' : 'hidden');
              });
            },

            /**

            */
            onSVGReady = function (event) {
              svgDocument = event.target.getSVGDocument();
              initPopulation();
              populationVisibility($scope.showPopulation);

              svgPanZoom('#map', {
                zoomEnabled: true,
                controlIconsEnabled: true
              });

            },
            svgDocument;

            $scope.$watch('location', function(location) {
              $scope.url = createUrl(location);
            });

            $scope.$watch('quality', function(quality) {
              $scope.url = createUrl(null, quality);
            });

            $scope.$watch('showPopulation', function(showPopulation) {
              populationVisibility(showPopulation);
            });

        // on dom ready
        $timeout(function(){
          $("#map")[0].onload = onSVGReady;
        }); 
      }
    };
  });
