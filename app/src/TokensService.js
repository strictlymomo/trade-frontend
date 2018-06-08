(function () {
  'use strict';

  app.service('TokensService', [
    '$q',
    '$http',
    TokensService
  ]);

  function TokensService($q, $http) {

    var tokens;
    var promise = $http.get('src/data/tokens-eth.json');

    promise.then(
      function (payload) {
        // console.log("TokensService - promise returned");
        tokens = payload;
        // console.dir(tokens);
      }
    );

    return {
      loadData: function () {
        // Simulate async nature of real remote calls
        // insert HTTP load via $q here from path
        return $q.when(promise);
      }
    };

  }
})();
