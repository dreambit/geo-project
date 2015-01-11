'use strict';

angular.module('geoApp', [
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'pascalprecht.translate',
  'ngAnimate',
  'ui-rangeSlider',
  'mgcrea.ngStrap.aside',
  'ui.bootstrap.popover',
  'ui.bootstrap.tpls'
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
      .when('/login', {
        templateUrl: 'views/login.html'
      })
      .when('/register', {
        templateUrl: 'views/register.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
