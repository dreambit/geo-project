'use strict';

angular.module('geoApp')
  .directive('configTool', function () {
    return {
      templateUrl: 'views/configtool.html',
      restrict: 'E',
      scope: {
        quality: '=',
        showPopulation: '='
      },
      link: function () {
        var configNode = $('#config-tool'),
            cogNode = $('#config-tool-cog'),
            isOpen = false;

        cogNode.click(function() {
          if (isOpen) {
            configNode.removeClass('open');
          } else {
            configNode.addClass('open');
          }
          isOpen = !isOpen;
        });
      }
    };
  });
