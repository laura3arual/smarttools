'use strict';

angular.module('mean.system').controller('CreateVideoController', ['$scope', 'Global', 'Video', '$state', '$stateParams', 'Upload',
  function($scope, Global, Video, $state, $stateParams, Upload) {

    $scope.newVideo = {};

    $scope.addVideo = function(){
      var video = new Video($scope.newVideo);
      video.contestId = $stateParams['contestId'];
      video.state = "InProcess";
      video.$save( {contestId: video.contestId}, function(response) {
        $state.go('contest', {contestId: video.contestId});
      });
    }
    $scope.upload = function(){
      Upload.upload({
        url: 'upload/url',
        data: {file: file, 'username': $scope.username}
      }).then(function (resp) {
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
      }, function (resp) {
        console.log('Error status: ' + resp.status);
      }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    }
  }
]);
