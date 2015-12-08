'use strict';

/**
 * @ngdoc function
 * @name recipiesTestApp.controller:FromcontrollerCtrl
 * @description
 * # FromcontrollerCtrl
 * Controller of the recipiesTestApp
 */
angular.module('Foodies')
  .controller('formCtrl', function($scope, api){
    var formCtrl = $scope;
    formCtrl.api = api;
    formCtrl.update = function (search){
      formCtrl.api.getRecipes(search.ingredient);
    };
  });
