'use strict';

/**
 * @ngdoc function
 * @name Foodies.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the Foodies
 */
angular.module('Foodies')
  .controller('detailCtrl', function ($routeParams, api, data) {
    var detail = this;
    detail.listOfIngredients = [];
    detail.id = $routeParams.id;
    detail.api = api;
    detail.data = data;

    // load datas for the recipe
    var promise = detail.api.getDetailRecipe(detail.id);
    // check if our ingredients in fridge are in the recipe
    promise.then(function(){
        detail.createListeOfIngredient();
      }
    );

    detail.createListeOfIngredient = function (){
      var status;
      for (var i = 0; i < detail.api.detailRecipe.ingredients.length; i++) {
        for (var y = 0; y < detail.data.myFridge.length; ++y) {
          if (detail.api.detailRecipe.ingredients[i].indexOf(detail.data.myFridge[y]) > -1) {
            status = "onMyFridge";
            break;
          } else {
            for (var z = 0; z < detail.data.shoppingList.length; ++z) {
              if (detail.api.detailRecipe.ingredients[i].indexOf(detail.data.shoppingList[z]) > -1){
                status = "onMyShoppingList";
                break;
              }
              else {
                status = "nowhere";
                break;
              }
            }
          }
        }
        detail.listOfIngredients.push({name: detail.api.detailRecipe.ingredients[i].toLowerCase(), status: status});
        status = "nowhere";
      }};

    detail.addToFrige = function() {
      detail.data.myFridge.push(detail.ingredient);
      updateListeOfIngredients(detail.ingredient, "add");
      detail.ingredient = "";
    }
    detail.add = function(elem) {
      detail.data.myFridge.push(elem);
      detail.removeToShoppingList(elem);
      updateListeOfIngredients(elem, "add");
      detail.ingredient = "";
    }

    detail.remove = function(elem) {
      detail.data.myFridge.splice(detail.data.myFridge.indexOf(elem),1);
      updateListeOfIngredients(elem, "delete");
    }

    detail.addToShoppingList = function(elem) {
      detail.data.shoppingList.push(elem.name);
      updateListeOfIngredients(elem.name, "addToShoppingList");
    }

    detail.removeToShoppingList = function(elem) {
      detail.data.shoppingList.splice(detail.data.shoppingList.indexOf(elem),1);
      updateListeOfIngredients(elem, "delete");
    }

    detail.load = function(){
      data.load();
    }

    detail.save = function (elem){
      data.save(elem);
    }

    var updateListeOfIngredients = function (elem, mode) {
      for (var i = 0; i < detail.listOfIngredients.length; ++i) {
        if (detail.listOfIngredients[i].name.indexOf(elem) > -1) {
          if(mode === "add"){
            detail.listOfIngredients[i].status = "onMyFridge";
          }else if (mode === "addToShoppingList"){
            detail.listOfIngredients[i].status = "onMyShoppingList";
          }
          else if(mode === "delete"){
            detail.listOfIngredients[i].status = "nowhere";
          }
          else{
            console.log("error : mode non reconnu")
          }
        }
      }
    }
  });
