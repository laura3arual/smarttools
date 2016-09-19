'use strict';

angular.module('mean.system').controller('CreateContestController', ['$scope', 'Global', 'Contest', '$state', 'MeanUser', 'Upload',
  function($scope, Global, Contest, $state, MeanUser, Upload) {
    $scope.newContest = {};
    $scope.addContest = function(){
      $scope.newContest.adminId = MeanUser.user._id;
      var contest = new Contest($scope.newContest);
      contest.$save(function(response) {
        $state.go('contests');
      });
    }

    $scope.upload = function (file) {
       Upload.base64DataUrl(file).then(function(urls){
         $scope.newContest.image = urls;
       });
   };
  }
]);
