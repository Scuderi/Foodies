//'use strict';

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
    detail.data = data;
    detail.data.id = $routeParams.id;
    detail.api = api;

    detail.buildMessage = function() {
      //create an ePOS-Print Builder object
      var builder = new epson.ePOSBuilder();
      //Title
        //create a print document
        builder.addTextLang('en');
        builder.addTextSmooth(true);
        builder.addTextFont(builder.FONT_A);
        builder.addTextSize(2,2);
        builder.addTextStyle(false, false, true, undefined);
        //specify the print data
        builder.addText('My Shopping List' + '\n');
        builder.addText('\n');
      //List
        //create a print document
        builder.addTextLang('en');
        builder.addTextSmooth(true);
        builder.addTextFont(builder.FONT_A);
        builder.addTextSize(1,1);
        builder.addTextStyle(false, false, false, undefined);
        //specify the print data
        for(var i = 0; i< detail.data.shoppingList.length; ++i) {
          builder.addText('■ ' + detail.data.shoppingList[i].name  +'\n');
        }

      builder.addText('\n');
      builder.addCut(builder.CUT_FEED);
      //aquire the print document
      var request = builder.toString();
      alert('La liste va être imprimée :)');
      //set the end point address
      var address='http://157.26.114.140/cgi-bin/epos/service.cgi?devid=local_printer&timeout=10000';
      //create an ePOS-Print object
      var epos= new epson.ePOSPrint(address);
      epos.send(request);
    }

    detail.data.callDetailRecipe();

    detail.addToFridge = function() {
      var ingLC = detail.ingredient.toLowerCase();
      detail.data.myFridge.$add({name : ingLC});
      updateListOfIngredients(ingLC, "addToFridge");
      detail.ingredient = "";
    };

    //from shopping list to the fridge
    detail.fromListToFridge = function(elem) {
      var ingLC = elem.name.toLowerCase();
      detail.data.myFridge.$add({name : ingLC}); // TODO : overload addToFridge() -> addToFridge(elem)
      detail.removeFromShoppingList(elem);
      updateListOfIngredients(ingLC, "addToFridge");
    };

    detail.removeFromFridge = function(elem) {
      detail.data.myFridge.$remove(elem);
      updateListOfIngredients(elem.name, "delete");
    };

    detail.addToShoppingList = function(elem) {
      var ingLC = elem.name.toLowerCase();
      detail.data.shoppingList.$add({name : ingLC});
      updateListOfIngredients(ingLC, "addToShoppingList");
    };

    detail.removeFromShoppingList = function(elem) {
      detail.data.shoppingList.$remove(elem);
      updateListOfIngredients(elem.name, "delete");
    };

    detail.removeFromShoppingListByName = function(elem) {
      var find = null;
      angular.forEach(detail.data.shoppingList, function(el) {
          if(el.name === elem) {
            find = el; // TODO : how to break in angular.forEach;
          }
        });
      detail.data.shoppingList.$remove(find);
      updateListOfIngredients(elem, "delete");
    };

    var updateListOfIngredients = function (elem, mode) {
      for (var i = 0; i < detail.data.listOfIngredients.length; ++i) {
        if (detail.data.listOfIngredients[i].name.indexOf(elem) > -1) {
          if(mode === "addToFridge"){
            detail.data.listOfIngredients[i].status = "onMyFridge";
          }else if (mode === "addToShoppingList"){
            detail.data.listOfIngredients[i].status = "onMyShoppingList";
          }
          else if(mode === "delete"){
            detail.data.listOfIngredients[i].status = "nowhere";
          }
          else{
            console.log("error : mode non reconnu");
          }
        }
      }
    };
  });
