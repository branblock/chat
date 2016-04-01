(function() {

  'use strict';

  function Rooms($firebaseArray) {
    var ref = new Firebase('https://blockchat.firebaseIO.com/');
    var rooms = $firebaseArray(ref.child('rooms'));

    return {
      all: rooms,
      get: function(roomId) {
        return rooms.$getRecord(roomId);
      }
    }
  }

  angular
    .module('chat')
    .factory('Rooms', ['$firebaseArray', Rooms])
})();
