'use strict';

/**
 * @ngdoc service
 * @name Foodies.data
 * @description
 * # data
 * Service in the Foodies.
 */
angular.module('Foodies')
  .service('data', function ($firebaseArray, api, users, auth) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var data = this;
    data.myFridge = [];
    data.shoppingList = [];
    data.listOfIngredients = [];
    data.id;

    data.getMyData = function () {
      users.login();
    };

    data.logout = function () {
      users.logout();
    };

    auth.$onAuth(function (authData) {
      data.authData = authData;
      if (data.authData !== null) {
        data.myFridge = $firebaseArray(new Firebase("https://foodies.firebaseio.com/users/" + data.authData.uid + "/Fridge"));
        data.shoppingList = $firebaseArray(new Firebase("https://foodies.firebaseio.com/users/" + data.authData.uid + "/ShoppingList"));
        data.myFridge.$loaded(function (list) {
          data.shoppingList.$loaded(function (list) {
            data.createListOfIngredient();
            console.log("shopping + Fridge load on auth changed");
          });
        });
      }
    });

    data.callDetailRecipe = function () {
      // load data for the recipe
      var promise = api.getDetailRecipe(data.id);
      promise.then(function () {
        if (data.authData !== null) {
          data.myFridge.$loaded(function (list) {
            data.shoppingList.$loaded(function (list) {
              data.createListOfIngredient();
              console.log("shopping + Fridge load on get API");
            });
          });
        }
      });

    };

    data.createListOfIngredient = function () {
      if(api.detailRecipe === undefined){ // call from $onAuth before api primise. The list will be create later by callDetailRecipe
        return;
      }
      var status = "nowhere";
      data.listOfIngredients = [];
      for (var i = 0; i < api.detailRecipe.ingredients.length; ++i) {
        for (var y = 0; y < data.myFridge.length; ++y) {
          if (api.detailRecipe.ingredients[i].indexOf(data.myFridge[y].name) > -1) {
            status = "onMyFridge";
            break;
          } else {
            for (var z = 0; z < data.shoppingList.length; ++z) {
              if (api.detailRecipe.ingredients[i].indexOf(data.shoppingList[z].name) > -1) {
                status = "onMyShoppingList";
                break;
              }
              else {
                status = "nowhere";
              }
            }
          }
        }
        data.listOfIngredients.push({name: api.detailRecipe.ingredients[i].toLowerCase(), status: status});
        status = "nowhere";
      }
    };
  });
