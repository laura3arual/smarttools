'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.smartTools').factory('Video', ['$resource',
  function($resource) {
    return $resource('api/contests/:contestId/video/:videoId', {
      videoId: '@_id',
      contestId: '@contestId'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
