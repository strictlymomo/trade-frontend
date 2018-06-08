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


    // config autocomplete
    $scope.simulateQuery = false;
    $scope.isDisabled = false;
    $scope.noCache = true;

    $scope.selectedItem = null;
    $scope.taker = null;
    $scope.maker = null;


    TokensService
      .loadData()
      .then(
        function (tokens) {
          // console.log("MainController - tokens:");
          $scope.tokens = tokens.data;
          // console.dir($scope.tokens);


          // ******************************
          // Autocomplete
          // ******************************

          $scope.tokens = loadAllTokens();

          $log.info('tokens to be searched:');
          console.dir($scope.tokens);
          $scope.querySearch = querySearch;
          $scope.selectedItemChangeTaker = selectedItemChangeTaker;
          $scope.selectedItemChangeMaker = selectedItemChangeMaker;
          $scope.searchTextChange = searchTextChange;

          // ******************************
          // Autocomplete Internal methods
          // ******************************

          /**
           * Search for tokens... use $timeout to simulate
           * remote dataservice call.
           */
          function querySearch(query) {
            console.log('querySearch, query:', query);
            var results = query ? $scope.tokens.filter(createFilterFor(query)) : $scope.tokens,
              deferred;
            console.log('querySearch, results:', results);
            if ($scope.simulateQuery) {
              deferred = $q.defer();
              $timeout(function () {
                deferred.resolve(results);
              }, Math.random() * 1000, false);
              return deferred.promise;
            } else {
              return results;
            }
          }

          function searchTextChange(text) {
            console.log('Text changed to ' + text);
          }

          function selectedItemChangeTaker(item) {
            console.log('Taker Item changed to ' + JSON.stringify(item));
            if (!item) {
              return;
            }
            console.log("selectedItem:", $scope.selectedItemTaker);
            setTaker(item);
          }

          function selectedItemChangeMaker(item) {
            console.log('Maker Item changed to ' + JSON.stringify(item));
            if (!item) {
              return;
            }
            console.log("selectedItem:", $scope.selectedItemMaker);
            setMaker(item);
          }

          /**
           * Build `components` list of key/value pairs
           */
          function loadAllTokens() {
            var tokens = $scope.tokens;
            return tokens.map(function (token) {
              token.search_value = token.symbol.toLowerCase();
              return token;
            });
          }

          /**
           * Create filter function for a query string
           */
          function createFilterFor(query) {

            angular.lowercase = function(text) {
              text.toLowerCase();
            }

            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(item) {

              // console.log('item:', item.search_value);
              // console.log('item typeof:', typeof item.search_value);
              // console.log('matching item:', item.search_value.indexOf(lowercaseQuery) === 0);
              return (item.search_value.indexOf(lowercaseQuery) === -1); // hack to return all results.  not matching yet
            };
          }

          function setTaker(selection) {
            $scope.taker = selection;
            console.log("$scope.taker:", $scope.taker);
          }

          function setMaker(selection) {
            $scope.maker = selection;
            console.log("$scope.maker:", $scope.maker);
          }
        }
      );


    CommonTradesService
      .loadData()
      .then(
        function (trades) {
          // console.log("MainController - common trades:");
          $scope.commonTrades = trades.data;
          // console.dir($scope.commonTrades);
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
