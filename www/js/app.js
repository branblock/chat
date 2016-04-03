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
      .state('rooms', {
        url: '/rooms',
        templateUrl: '/rooms.html',
        controller: 'RoomsListCtrl'
      })
      .state('room', {
        url: '/rooms/:roomId',
        templateUrl: '/room.html',
        controller: 'RoomDetailCtrl'
      });
    $urlRouterProvider.otherwise('rooms');
  }

  angular
    .module('chat', ['ionic', 'firebase'])
    .config(config);
})();
