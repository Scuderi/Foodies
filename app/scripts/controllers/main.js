'use strict';

/**
 * @ngdoc function
 * @name recipiesTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the recipiesTestApp
 */
angular.module('recipiesTestApp')
  .controller('MainCtrl', function (api) {
    var main = this;
    main.api = api;
    main.api.getRecipes();
  });
