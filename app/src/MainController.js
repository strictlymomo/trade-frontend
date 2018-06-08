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
    $scope.taker = {search_value: "", symbol: ""};
    $scope.maker = {search_value: "", symbol: ""};


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

          $scope.tokensForSearch = loadAllTokens();

          $log.info('tokensForSearch:');
          console.dir($scope.tokensForSearch);
          self.querySearch = querySearch;
          self.selectedItemChange = selectedItemChange;
          self.searchTextChange = searchTextChange;
          $log.info('searchTextChange:', searchTextChange);

          // ******************************
          // Autocomplete Internal methods
          // ******************************

          /**
           * Search for tokens... use $timeout to simulate
           * remote dataservice call.
           */
          function querySearch(query) {
            var results = query ? $scope.tokensForSearch.filter(createFilterFor(query)) : $scope.tokensForSearch,
              deferred;
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
            $scope.taker.symbol = text;
            console.log('$scope.search:', $scope.searchTaker);
          }

          function selectedItemChange(item) {
            console.log('Item changed to ' + JSON.stringify(item));
            if (!item) {
              return;
            }
            // setTaker(item.symbol);
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
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(item) {
              return (item.search_value.indexOf(lowercaseQuery) === 0);
            };
          }

          function setTaker(token) {
            self.taker = token;
          }

          function setMaker(token) {
            self.maker = token;
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
