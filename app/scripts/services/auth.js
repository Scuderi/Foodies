'use strict';

/**
 * @ngdoc service
 * @name recipiesTestApp.auth
 * @description
 * # auth
 * Factory in the recipiesTestApp.
 */
angular.module('Foodies')
  .factory('auth', function($firebaseAuth) {
      var ref = new Firebase("https://foodies.firebaseio.com");
      return $firebaseAuth(ref);
  });
