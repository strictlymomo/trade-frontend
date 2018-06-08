app.controller('ResultsController', [
  '$scope',
  '$rootScope',
  '$timeout',
  '$log',
  '$q',
  '$route',
  '$routeParams',
  '$location',
  '$http',
  '$window',
  ResultsController
]);

function ResultsController($scope, $rootScope, $timeout, $log, $q, $route, $routeParams, $location, $http, $window) {

  var self = this;

  self.location = $location.path();
  // console.log('ResultsController - $location is:', self.location);

}