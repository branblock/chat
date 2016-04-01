(function() {

  'use strict';

  function RoomsListCtrl($scope, $ionicPopup, Rooms) {
    $scope.rooms = Rooms.all;

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

  function RoomDetailCtrl($scope, $stateParams, $ionicHistory, Rooms) {
    $scope.room = Rooms.get($stateParams.roomId);

    $scope.backToRoomsList = function() {
      $ionicHistory.goBack();
    };
  }

  angular
    .module('chat')
    .controller('RoomsListCtrl', ['$scope', '$ionicPopup', 'Rooms', RoomsListCtrl])
    .controller('RoomDetailCtrl', ['$scope', '$stateParams', '$ionicHistory', 'Rooms', RoomDetailCtrl]);
})();
