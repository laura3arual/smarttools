'use strict';

angular.module('mean.system')
  .controller('ContestController', ['$scope', 'Global', 'Contest', '$state', '$stateParams', 'Video',
    function ($scope, Global, Contest, $state, $stateParams, Video) {

      $scope.totalItems = 0;
      $scope.currentPage = 1;
      $scope.pageSize = 5;

      $scope.loadVideos = function () {

        $scope.currentContest = Contest.get({contestId: $stateParams['contestId']}, function () {
          Video.query({contestId: $scope.currentContest._id}, function (contests) {
            console.log(contests);
            $scope.videos = contests;
            $scope.totalItems = $scope.videos.length;
          });
        });

      };


      $scope.loadVideos();
    }
  ])
  .filter('startFrom', function () {
    return function (input, start) {
      start = +start; //parse to int
      return input.slice(start);
    }
  });
