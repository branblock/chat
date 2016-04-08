(function() {

  'use strict';

  function RoomFactory($firebaseArray) {
    var ref = new Firebase('https://blockchat.firebaseio.com/');
    var rooms = $firebaseArray(ref.child('rooms'));
    var messages = $firebaseArray(ref.child('messages'));

    return {
      allRooms: rooms,
      getRoom: function(roomId) {
        return rooms.$getRecord(roomId);
      },
      getMessages: function(roomId) {
        return $firebaseArray(ref.child('messages').orderByChild('roomId').equalTo(roomId));
      },
      send: function(newMessage, roomId) {
        return messages.$add({
          username: 'user',
          content: newMessage,
          sentAt: Firebase.ServerValue.TIMESTAMP,
          roomId: roomId
        });
      }
    }
  }

  function AuthFactory($firebaseAuth) {
    var ref = new Firebase('https://blockchat.firebaseio.com/');
    return $firebaseAuth(ref);
  }

  angular
    .module('CharterChat')
    .factory('RoomFactory', ['$firebaseArray', RoomFactory])
    .factory('AuthFactory', ['$firebaseAuth', AuthFactory]);
})();
