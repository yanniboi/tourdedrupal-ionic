angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $rootScope, $firebase) {

    if ($scope.current == null) {
      $scope.current = {};
      $scope.showMap = false;
    }

    function positionLog(position) {
      console.log('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n'
      );
    }

    var onSuccess = function(position) {
      var rsvp = {lat: position.coords.latitude, lng: position.coords.longitude, timestamp: position.timestamp};

      var bucketListRef = new Firebase($rootScope.baseUrl + 'yanniboi');
      $firebase(bucketListRef).$push(rsvp);

      $scope.current.lat = position.coords.latitude;
      $scope.current.lng = position.coords.longitude;
      $scope.showMap = true;

      positionLog(position);

    };

    // onError Callback receives a PositionError object
    function onError(error) {
      console.log('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
    }

    $scope.updateCurrent = function () {
      $scope.showMap = true;
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };

    $scope.startTracking = function () {
      $scope.tracking = true;
      $rootScope.watchID = navigator.geolocation.watchPosition(onSuccess, onError);
    };

    $scope.stopTracking = function () {
      $scope.tracking = false;
      navigator.geolocation.clearWatch($rootScope.watchID);
    }
})

.controller('FriendsCtrl', function($scope, $rootScope, $firebase, Friends) {
  $scope.friends = Friends.all();

    $scope.button = function() {

      var url = 'https://tourdedrupal.firebaseio.com/';
      var meRef = new Firebase(url).child('users/yanniboi');
      //$rootScope.firebase = $firebase(fireRef);

      // return it as a synchronized object

      var me = $firebase(meRef).$asObject();
      me.$bindTo($scope, "profile");

      var userRef = new Firebase(url).child('yanniboi');
      $scope.users2 = $firebase(userRef).$asArray();

      var test = '';
    }
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
  $scope.pings = Friends.getPings($stateParams.friendId);

  $scope.showPingMap = function () {
  };
})

.controller('AccountCtrl', function($scope) {
});
