'use strict';

angular.module('mean.system').controller('PublicContestController', ['$scope', 'Global', 'Contest', 'Video', '$state', '$stateParams', '$http', '$sce',
  function($scope, Global, Contest, Video, $state, $stateParams, $http, $sce) {

    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.pageSize = 3;

    $scope.htmlVideoTags = {};
    $scope.currentContestId = $stateParams['contestId'];

    $scope.loadVideos = function(){      

      $http.get('/api/contests/' + $stateParams['contestId']).then(function(response){
        $scope.currentContest = response.data;
        Video.query({contestId: $scope.currentContest._id}, function (contests) {
            $scope.videos = contests;
            $scope.totalItems = $scope.videos.length;
            $scope.setHtmlTags($scope.videos);
          });
      });
    };
    $scope.loadVideos();

    $scope.setHtmlTags = function(videos){
      videos.forEach(function(video){
        $scope.htmlVideoTags[video._id] = $sce.trustAsHtml(
          ' <video controls><source src="http://localhost:9000/' + video._id + '.mp4" type="video/mp4">' +
          'Your browser does not support the video tag.</video>');
      });
    };
  }
]);
