'use strict';

angular.module('mean.system').controller('CreateVideoController', ['$scope', 'Global', 'Video', '$state', '$stateParams', 'Upload', '$q','$uibModal',
  function($scope, Global, Video, $state, $stateParams, Upload, $q,$uibModal) {

    $scope.newVideo = {};

    $scope.addVideo = function(){
      var video = new Video($scope.newVideo);
      video.contestId = $stateParams['contestId'];
      video.state = "InProcess";
      video.uploadDate = new Date();
      video.$save( {contestId: video.contestId}, function(response) {
        $scope.upload($scope.file, response._id).then(function(){
          alert("Hemos recibido tu video y los estamos procesado para que sea publicado. Tan pronto el video quede publicado en la página del concurso te notificaremos por email.”.");          
          $state.go('public', {contestId: video.contestId});
        });
      });
    };

    $scope.upload = function(file, videoId){
      var defer = new $q.defer();
      Upload.upload({
        url: '/api/upload/video/' + videoId,
        data: {file: file, 'username': $scope.username}
      }).then(function (resp) {
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        defer.resolve();
      }, function (resp) {
        console.log('Error status: ' + resp.status);
      }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
      return defer.promise;
    };
  }
]);
