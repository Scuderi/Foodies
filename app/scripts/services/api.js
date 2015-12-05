'use strict';

/**
 * @ngdoc service
 * @name Foodies.api
 * @description
 * # api
 * Service in the Foodies.
 */
angular.module('Foodies')
  .service('api', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var api = this;
    var urlServerAPI = "http://localhost:";
    var portServerAPI = "3003";

    api.getDetailRecipe = function(id){
      var url = "https" + id;
      return $http({
        method: 'GET',
        url: urlServerAPI + portServerAPI + "/" + id
      }).
      success(function(status) {
        console.log('get detail: ok');
         api.detailRecipe = status.recipe;
      }).
      error(function(status) {
        console.log('ko');
      });
    }

    api.getRecipes = function() {
      $http({
        method: 'GET',
        url: urlServerAPI + portServerAPI + "/search"
      }).
      success(function(status) {
        api.recipes = status.recipes;
      }).
      error(function(status) {
        console.log('ko');
      });
    }

  });
