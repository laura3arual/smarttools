'use strict';

angular.module('mean.system').controller('PublicContestController', ['$scope', 'Global', 'Contest', '$state', '$stateParams', '$http',
  function($scope, Global, Contest, $state, $stateParams, $http) {
    $scope.currentContestId = $stateParams['contestId'];
    $scope.loadVideos = function(){
      $http.get('/api/public/contests/' + $stateParams['contestId']).then(function(response){
        $scope.videos = response.data;
      });
    }
    $scope.loadVideos();
  }
]);
