(function() {

  'use strict';

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
    $scope.room = RoomFactory.room($stateParams.roomId);
    $scope.messages = RoomFactory.messages($scope.room.$id);

    $scope.sendMessage = function(newMessage) {
      RoomFactory.send($scope.newMessage, $scope.room.$id);
      $scope.newMessage = '';
    };

    $scope.backToRoomsList = function() {
      $ionicHistory.goBack();
    };
  }

  angular
    .module('chat')
    .controller('RoomsListCtrl', ['$scope', '$ionicPopup', 'RoomFactory', RoomsListCtrl])
    .controller('RoomDetailCtrl', ['$scope', '$stateParams', '$ionicHistory', 'RoomFactory', RoomDetailCtrl]);
})();
