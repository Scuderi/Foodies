'use strict';

/**
 * @ngdoc function
 * @name recipiesTestApp.controller:FromcontrollerCtrl
 * @description
 * # FromcontrollerCtrl
 * Controller of the recipiesTestApp
 */
angular.module('Foodies')
  .controller('formCtrl', function($scope, api, users, auth){
    var formCtrl = $scope;
    formCtrl.api = api;
    formCtrl.authData = users;
    formCtrl.update = function (search){
      formCtrl.api.getRecipes(search.ingredient);
    };

    formCtrl.login = function(submit){
      users.login(submit.login, submit.pwd);
      submit.login = "";
      submit.pwd = "";
    };

    formCtrl.logout = function(){
      users.logout();
    };

    auth.$onAuth(function (authData) {
      formCtrl.authData = authData;
    });
  });
