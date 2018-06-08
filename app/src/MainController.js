(function () {

  app
      .controller('MainController', [
        '$mdMedia',
        '$timeout',
        '$log',
        '$rootScope',
        '$scope',
        '$route',
        '$routeParams',
        '$location',
        '$filter',
        '$element',
        'TokensService',
        MainController
      ]);

  /* Main Controller for the 'Where Should I Trade' App
   * @constructor
   */
  function MainController($mdMedia, $timeout, $log, $rootScope, $scope, $route, $routeParams, $location, $filter, $element, TokensService) {

    var self = this;
    var path = $rootScope.$$url;

    // tokens
    $scope.tokens = [];

    TokensService
        .loadData()
        .then(
            function (tokens) {
              console.log("MainController - tokens:");
              $scope.tokens = tokens.data;
              console.dir($scope.tokens);
            }
        );


    // *********************************
    // Route Change
    // *********************************
    $scope.go = function (path) {
      $location.path(path);
    };
  }
})();
