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
  'ui.bootstrap.tpls',
  'toggle-switch',
  'ngCookies',
  'ui.checkbox'
])
  .config(function ($routeProvider, $httpProvider) {
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
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html'
      })
      .otherwise({
        redirectTo: '/'
      });

    // login interceptor
    $httpProvider.interceptors.push(function ($q, $rootScope) {
      var isRestCall,
          authToken;
      return {
        'request': function(config) {
          isRestCall = config.url.indexOf('rest') === 0;
          if (isRestCall && angular.isDefined($rootScope.authToken)) {
            authToken = $rootScope.authToken;
            config.headers['X-Auth-Token'] = authToken;
          }
          return config || $q.when(config);
        }
      };
    });

  })
  .run(function ($rootScope, $location, $cookieStore, UserService) {
    var authToken;

    $rootScope.logout = function () {
      delete $rootScope.user;
      $cookieStore.remove('authToken');
    };

    authToken = $cookieStore.get('authToken');

    if (authToken !== undefined) {
      $rootScope.authToken = authToken;
      UserService.get(function(user) {
        $rootScope.user = user;
      });
    }
  });
