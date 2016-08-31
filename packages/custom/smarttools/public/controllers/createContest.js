'use strict';

angular.module('mean.system').controller('CreateContestController', ['$scope', 'Global', 'Contest', '$state', 'MeanUser',
  function($scope, Global, Contest, $state, MeanUser) {
    $scope.newContest = {};
    $scope.addContest = function(){
      $scope.newContest.adminId = MeanUser.user._id;
      var contest = new Contest($scope.newContest);
      contest.$save(function(response) {
        $state.go('contests');
      });
    }
  }
]);
