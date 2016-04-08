(function() {

  'use strict';

  function DashCtrl ($scope, AuthFactory) {
    $scope.login = function(authMethod) {
      AuthFactory.$authWithOAuthRedirect(authMethod).then(function(authData) {
        console.log(authData);
      }).catch(function(error) {
        if (error.code === 'TRANSPORT_UNAVAILABLE') {
          AuthFactory.$authWithOAuthPopup(authMethod).then(function(authData) {
            console.dir(authData);
          });
        } else {
          console.log(error);
        }
      });
    };

    AuthFactory.$onAuth(function(authData) {
      if (authData === null) {
        console.log('Not logged in yet');
      } else {
        console.log('Logged in as', authData.uid);
      }
      $scope.authData = authData;
    });
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
    .controller('DashCtrl', ['$scope', 'AuthFactory', DashCtrl])
    .controller('RoomsListCtrl', ['$scope', '$ionicPopup', 'RoomFactory', RoomsListCtrl])
    .controller('RoomDetailCtrl', ['$scope', '$stateParams', '$ionicHistory', 'RoomFactory', RoomDetailCtrl])
    .controller('ScheduleCtrl', ['$scope', ScheduleCtrl]);
})();
