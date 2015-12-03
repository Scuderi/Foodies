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
    var headers = {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    api.getDetailRecipe = function(id){
      var url = "http://food2fork.com/api/get?key=b684e60483b5d68cde40196e178c30e4&rId=" + id;
      return $http({
        method: 'GET',
        headers: headers,
        url: url
      }).
      success(function(status) {
        console.log('get recipes : ok');
         api.detailRecipe = status.recipe;
      }).
      error(function(status) {
        console.log('ko');
      });
    }

    api.getRecipes = function() {
      var url = "http://food2fork.com/api/search?key=b684e60483b5d68cde40196e178c30e4&q=chicken";
      $http({
        method: 'GET',
        headers: headers,
        url: url
      }).
      success(function(status) {
        api.recipes = status.recipes;
      }).
      error(function(status) {
        console.log('ko');
      });
    }

  });
