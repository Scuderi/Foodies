'use strict';

/**
 * @ngdoc function
 * @name Foodies.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the Foodies
 */
angular.module('Foodies')
  .controller('MainCtrl', function (api, $location) {
    var main = this;
    main.api = api;

    //show the recipe
    main.showMore = function (elemid) {
     $location.path("/detail/" + elemid);
    };
  });

