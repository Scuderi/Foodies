'use strict';

/**
 * @ngdoc service
 * @name Foodies.data
 * @description
 * # data
 * Service in the Foodies.
 */
angular.module('Foodies')
  .service('data', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var data = this;
    data.myFridge = ["chicken", "salt", "cheddar"];
    data.shoppingList = [];

    this.save = function(elem){
      window.localStorage.setItem(this.generateUUID(), JSON.stringify(elem));
    };
  });
