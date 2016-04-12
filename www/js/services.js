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

  function AuthFactory($firebaseAuth, $state) {
    var ref = new Firebase('https://blockchat.firebaseio.com/');
    var auth = $firebaseAuth(ref);
    var userId;
    var is_logged_in = false;

    return {
			signIn: function(email, password){
				auth.$authWithPassword({
					email: email,
					password: password
				}).then(function(authData){
          $state.go('tab.user');
					console.log('Logged in as: ' + authData.uid);
          userId = authData.uid;
          is_logged_in = true;
				}).catch(function(error) {
          console.error(error);
        });
			},
			signOut: function() {
				auth.$unauth();
        $state.go('tab.dash');
        console.log('User has logged out');
			}
    }
  }

  angular
    .module('CharterChat')
    .factory('RoomFactory', ['$firebaseArray', RoomFactory])
    .factory('AuthFactory', ['$firebaseAuth', '$state', AuthFactory]);
})();
