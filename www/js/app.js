(function() {

  'use strict';

  function run($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/templates/home.html',
        controller: 'HomeCtrl'
      })
      .state('rooms', {
        url: '/rooms',
        templateUrl: '/templates/rooms.html',
        controller: 'RoomsListCtrl'
      })
      .state('room', {
        url: '/rooms/:roomId',
        templateUrl: '/templates/room.html',
        controller: 'RoomDetailCtrl'
      });
    $urlRouterProvider.otherwise('home');
  }

  angular
    .module('chat', ['ionic', 'firebase'])
    .config(config);
})();
