'use strict';

angular.module('geoApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, $cookieStore, UserService) {

    $scope.login = function() {
      UserService.authenticate($.param({email: $scope.email, password: $scope.password}), function(authenticationResult) {
        var authToken = authenticationResult.token;

        $rootScope.authToken = authToken;

        if ($scope.rememberMe) {
          $cookieStore.put('authToken', authToken);
        }

        UserService.get(function(user) {
          $rootScope.user = user;
          $location.path('/');
        });

      });
    };
  });
