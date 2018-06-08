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
      'CommonTradesService',
      MainController
    ]);

  /* Main Controller for the 'Where Should I Trade' App
   * @constructor
   */
  function MainController($mdMedia, $timeout, $log, $rootScope, $scope, $route, $routeParams, $location, $filter, $element, TokensService, CommonTradesService) {

    var self = this;
    var path = $rootScope.$$url;

    // data
    $scope.tokens = [];
    $scope.commonTrades = [];

    TokensService
      .loadData()
      .then(
        function (tokens) {
          console.log("MainController - tokens:");
          $scope.tokens = tokens.data;
          console.dir($scope.tokens);
        }
      );


    CommonTradesService
      .loadData()
      .then(
        function (trades) {
          console.log("MainController - common trades:");
          $scope.commonTrades = trades.data;
          console.dir($scope.commonTrades);
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
