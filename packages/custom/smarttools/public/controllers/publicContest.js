'use strict';

angular.module('mean.system').controller('PublicContestController', ['$scope', 'Global', 'Contest', '$state', '$stateParams', '$http', '$sce',
  function($scope, Global, Contest, $state, $stateParams, $http, $sce) {
    $scope.htmlVideoTags = {};
    $scope.currentContestId = $stateParams['contestId'];
    $scope.loadVideos = function(){
      $http.get('/api/public/contests/' + $stateParams['contestId']).then(function(response){
        $scope.videos = response.data;
        $scope.setHtmlTags($scope.videos);
      });
    }
    $scope.loadVideos();

    $scope.setHtmlTags = function(videos){
      videos.forEach(function(video){
        $scope.htmlVideoTags[video._id] = $sce.trustAsHtml(
          ' <video controls><source src="http://localhost:9000/' + video._id + '.mp4" type="video/mp4">' +
          'Your browser does not support the video tag.</video>');
      });
    }
  }
]);
