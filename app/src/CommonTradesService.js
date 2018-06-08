(function(){
  'use strict';

  app.service('CommonTradesService', [
    '$q',
    '$http',
    CommonTradesService
  ]);

  function CommonTradesService($q, $http){

    var trades;
    var promise = $http.get('src/data/common-trades.json');

    promise.then(
        function(payload) {
          // console.log("CommonTradesService - promise returned:");
          trades = payload;
          // console.dir(trades);
        }
    );

    return {
      loadData : function() {
        // Simulate async nature of real remote calls
        // insert HTTP load via $q here from path
        return $q.when(promise);
      }
    };

  }
})();
