'use strict';

/**
 * @ngdoc function
 * @name Foodies.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the Foodies
 */
angular.module('Foodies')
  .controller('MainCtrl', function (api) {
    var main = this;
    main.api = api;
  });
