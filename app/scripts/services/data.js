'use strict';

/**
 * @ngdoc service
 * @name recipiesTestApp.data
 * @description
 * # data
 * Service in the recipiesTestApp.
 */
angular.module('recipiesTestApp')
  .service('data', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var data = this;
    data.myFridge = ["chicken", "salt", "cheddar"];
    data.shoppingList = [];

    this.save = function(elem){
      window.localStorage.setItem(this.generateUUID(), JSON.stringify(elem));
    }

    this.load = function(){
      this.movies = [];
      for (var i = 0; i < localStorage.length; i++)this.myFridge.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    };
  });
