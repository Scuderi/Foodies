'use strict';

/**
 * @ngdoc overview
 * @name Foodies
 * @description
 * # Foodies
 *
 * Main module of the application.
 */
angular
  .module('Foodies', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/detail/:id', {
        templateUrl: 'views/detail.html',
        controller: 'detailCtrl',
        controllerAs: 'detail'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
