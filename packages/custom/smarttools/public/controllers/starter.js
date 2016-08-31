(function() {
  'use strict';

  angular.module('mean.smartTools')
    .controller('SmartToolsController', SmartToolsController);

  SmartToolsController.$inject = ['$scope', 'Global'];

  function SmartToolsController($scope, Global) {
    // Original scaffolded code.
    $scope.global = Global;
    $scope.package = {
      name: 'meanSmartTools'
    };
  }
})();
