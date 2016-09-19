'use strict';

angular.module('mean.system').controller('UpdateContestController', ['$scope', 'Global', 'Contest', '$state', '$stateParams', 'Upload',
  function($scope, Global, Contest, $state, $stateParams, Upload) {
    $scope.ready = false;
    $scope.currentContest = Contest.get({contestId: $stateParams['contestId']});
    $scope.currentContest.$promise.then(function(data){
      $scope.currentContest.startDate = new Date(data.startDate);
      $scope.currentContest.endDate = new Date(data.endDate);
      $scope.ready = true;
    });

    $scope.updateContest = function(){
     this.currentContest.$update(function (){
          $state.go('contests');
        });
    }

    $scope.upload = function (file) {
       Upload.base64DataUrl(file).then(function(urls){
         $scope.currentContest.image = urls;
       });
   };
  }
]);
