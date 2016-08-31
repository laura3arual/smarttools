'use strict';

angular.module('mean.system').controller('UpdateContestController', ['$scope', 'Global', 'Contest', '$state', '$stateParams',
  function($scope, Global, Contest, $state, $stateParams) {
    $scope.currentContest = Contest.get({contestId: $stateParams['contestId']});
    $scope.updateContest = function(){
     this.currentContest.$update(function (){
          $state.go('contests');
        });
    }
  }
]);
