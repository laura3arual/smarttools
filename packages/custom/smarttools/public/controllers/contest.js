'use strict';

angular.module('mean.system')
  .controller('ContestController', ['$scope', 'Global', 'Contest', '$state', '$stateParams', 'Video','$sce',
    function ($scope, Global, Contest, $state, $stateParams, Video, $sce) {

      $scope.totalItems = 0;
      $scope.currentPage = 1;
      $scope.pageSize = 3;

      $scope.htmlVideoTags = {};

      $scope.loadVideos = function () {

        $scope.currentContest = Contest.get({contestId: $stateParams['contestId']}, function () {
          Video.query({contestId: $scope.currentContest._id}, function (contests) {
            $scope.videos = contests;
            $scope.totalItems = $scope.videos.length;
            console.log($scope.totalItems);
            $scope.setHtmlTags($scope.videos);
          });
        });

      };

      $scope.setHtmlTags = function(videos){
        videos.forEach(function(video){
          $scope.htmlVideoTags[video._id] = $sce.trustAsHtml(
            ' <video controls><source src="http://localhost:9000/' + video._id + '.mp4" type="video/mp4">' +
            'Your browser does not support the video tag.</video>');
        });
      };


      $scope.loadVideos();
    }
  ])
  .filter('startFrom', function () {
    return function (input, start) {
      if (!input || !input.length) { return; }

      start =+ start; //parse to int
      return input.slice(start);
    }
  });
