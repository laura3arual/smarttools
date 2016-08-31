'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.smartTools').factory('Contest', ['$resource',
  function($resource) {
    return $resource('api/contests/:contestId', {
      contestId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
