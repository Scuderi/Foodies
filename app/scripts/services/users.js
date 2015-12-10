'use strict';

/**
 * @ngdoc service
 * @name recipiesTestApp.users
 * @description
 * # users
 * Service in the recipiesTestApp.
 */
angular.module('Foodies')
  .service('users', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var ref = new Firebase("https://foodies.firebaseio.com");
    var users = this;
    users.authData;
    users.logout = function(){
      ref.unauth();
    };
    users.login = function (){

      ref.authWithPassword({
        email    : "renzo.scuderi@gmail.com",
        password : "test"
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          users.authData = authData;
        }
      });
    };

  });
