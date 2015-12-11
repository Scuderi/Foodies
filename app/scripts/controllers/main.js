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

/*main.showMore = function(elem){
 var urlPage = "http://localhost:9000/#/detail/" + elem.recipe_id;
 return $http({
 method: 'GET',
 url: urlPage
 })
 pas au point encore */
