(function() {

  'use strict';

  function run($ionicPlatform, $rootScope, auth, store, jwtHelper, $state) {
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
      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      // This is the state where you'll show the login
      .state('tab.dash', {
        url: '/dash',
        views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
          }
        }
      })
      .state('tab.rooms', {
        url: '/rooms',
        views: {
        'tab-rooms': {
          templateUrl: '/templates/tab-rooms.html',
          controller: 'RoomsListCtrl'
          }
        }
      })
      .state('tab.room', {
        url: '/rooms/:roomId',
        views: {
        'tab-rooms': {
          templateUrl: '/templates/room.html',
          controller: 'RoomDetailCtrl'
          }
        }
      })
      .state('tab.schedule', {
        url: '/schedule',
        views: {
        'tab-schedule': {
          templateUrl: '/templates/tab-schedule.html',
          controller: 'ScheduleCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('tab/dash');
  }

  angular
    .module('CharterChat', ['ionic', 'firebase'])
    .config(config)
})();
