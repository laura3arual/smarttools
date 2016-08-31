'use strict';

angular.module('mean.system').controller('ContestsController', ['$scope', 'Global', 'Contest', '$state', 'MeanUser',
  function($scope, Global, Contest, $state, MeanUser) {
    $scope.newContest = {};
    $scope.delete = function(contest){
      var contest = Contest.get({contestId: contest._id}, function(){
        contest.$delete(function (){
          $scope.loadContests();
        });
      });
    }
    $scope.update = function(contest) {
      $state.go('updateContest', {contestId: contest._id});
    }

    $scope.loadContests = function(){
      Contest.query({adminId: MeanUser.user._id}, function(contests) {
        $scope.contests = contests;
      });
    }
    $scope.loadContests();
    $scope.goToCreateContest = function() {
      $state.go('createContest');
    }
  }
]);
