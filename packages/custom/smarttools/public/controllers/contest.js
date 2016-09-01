'use strict';

angular.module('mean.system').controller('ContestController', ['$scope', 'Global', 'Contest', '$state', '$stateParams', 'Video',
  function($scope, Global, Contest, $state, $stateParams, Video) {

    $scope.loadVideos = function(){
      $scope.currentContest = Contest.get({contestId: $stateParams['contestId']}, function(){
        Video.query({contestId: $scope.currentContest._id}, function(contests) {
          $scope.videos = contests;
        });
      });
    };

    $scope.loadVideos();
  }
]);
