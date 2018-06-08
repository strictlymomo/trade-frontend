(function(){

  app.controller('SearchController', [
    '$scope',
    '$timeout',
    '$log',
    '$q',
    '$route',
    '$routeParams',
    SearchController
  ]);

  function SearchController($scope, $timeout, $log, $q, $route, $routeParams) {
    var self = this;
    //inherit tokens data from parent
    self.tokens = $scope.tokens;

    // console.log('SearchController routeParams:', $routeParams);
    // console.log("SearchController - inherited $scope.tokens from MainController:");
    // console.dir(self.tokens);
  }

})();