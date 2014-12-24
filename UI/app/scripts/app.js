'use strict';

angular.module('engApp', [
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'pascalprecht.translate',
  'ngAnimate',
  'ui-rangeSlider',
  'ui.bootstrap',
  'mgcrea.ngStrap',
  'infinite-scroll'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/welcome', {
        templateUrl: 'views/welcome.html'
      })
      .when('/dashboard/profile', {
        templateUrl: 'views/dashboard-profile.html'
      })
      .when('/dashboard/dictionary', {
        templateUrl: 'views/dashboard-dictionary.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
