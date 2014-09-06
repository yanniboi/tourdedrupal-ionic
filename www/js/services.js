angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function($rootScope, $firebase) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'yanniboi' },
    { id: 1, name: 'i_compute' },
    { id: 2, name: 'joates' },
    { id: 3, name: 'rachel_norfolk' }
  ];





  return {
    all: function() {
      var usersRef = new Firebase($rootScope.baseUrl).child('users');
      friends = $firebase(usersRef).$asArray();
      return friends;
    },
    get: function(friendId) {
      var userRef = new Firebase($rootScope.baseUrl).child('users/' + friendId);
      friend = $firebase(userRef).$asObject();

      //friend.sample = "physicsmarie@firebase.com";
      //friend.$save();
      return friend;
    },
    getPings: function(friendId) {
      var userRef = new Firebase($rootScope.baseUrl).child(friendId);
      pings = $firebase(userRef).$asArray();

      //friend.sample = "physicsmarie@firebase.com";
      //friend.$save();
      return pings;
    }
  }
});
