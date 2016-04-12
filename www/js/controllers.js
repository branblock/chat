(function() {

  'use strict';

  function LoginCtrl ($scope, AuthFactory, $state, $ionicModal) {
    $scope.data = {};

    $scope.loginEmail = function(email, password) {
      var email = $scope.data.email;
      var password = $scope.data.password;
      AuthFactory.signIn(email, password);
    };

    $scope.logoutEmail = function(user) {
      AuthFactory.signOut();
    };
  }

  function RoomsListCtrl($scope, $ionicPopup, RoomFactory) {
    $scope.rooms = RoomFactory.allRooms;

    $scope.createRoom = function() {
      var timestamp = new Date().valueOf();
      $ionicPopup.prompt({
        title: 'Add a room',
        subTitle: 'Use simple names',
      }).then(function(room) {
        $scope.rooms.$add({
          name: room,
          id: timestamp
        });
      });
    };

    $scope.deleteRoom = function(room) {
      $scope.rooms.$remove(room);
    };
  }

  function RoomDetailCtrl($scope, $stateParams, $ionicHistory, RoomFactory) {
    $scope.room = RoomFactory.getRoom($stateParams.roomId);
    $scope.messages = RoomFactory.getMessages($scope.room.$id);

    $scope.sendMessage = function(newMessage) {
      RoomFactory.send($scope.newMessage, $scope.room.$id);
      $scope.newMessage = '';
    };

    $scope.backToRoomsList = function() {
      $ionicHistory.goBack();
    };
  }

  function ScheduleCtrl ($scope) {}

  angular
    .module('CharterChat')
    .controller('LoginCtrl', ['$scope', 'AuthFactory', '$state', LoginCtrl])
    .controller('RoomsListCtrl', ['$scope', '$ionicPopup', 'RoomFactory', RoomsListCtrl])
    .controller('RoomDetailCtrl', ['$scope', '$stateParams', '$ionicHistory', 'RoomFactory', RoomDetailCtrl])
    .controller('ScheduleCtrl', ['$scope', ScheduleCtrl]);
})();
