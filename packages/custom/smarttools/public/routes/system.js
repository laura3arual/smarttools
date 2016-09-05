'use strict';

//Setting up route
angular.module('mean.smartTools').config(['$meanStateProvider', '$urlRouterProvider', '$compileProvider',
  function($meanStateProvider, $urlRouterProvider, $compileProvider) {

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(http|https?|ftp|mailto|chrome-extension):/);
    var checkLoggedOut = function($http, $q, $location, $timeout) {
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/api/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $cookies.put('redirect', $location.path());
          $timeout(deferred.reject);
          $location.url('/');
        }
      });
      return deferred.promise;
    };
    var checkLoggedIn = function($http, $q, $location, $timeout) {
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/api/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') {
          $location.url('/');
          $timeout(deferred.reject);
        }
        // Not Authenticated
        else $timeout(deferred.resolve);
      });
      return deferred.promise;

    };


    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $meanStateProvider
      .state('home', {
        url: '/',
        templateUrl: 'smartTools/views/system/index.html',
      })
      .state('contests', {
        url: '/contests',
        templateUrl: 'smartTools/views/system/contests.html',
        resolve: {
          loggedin: function ($http, $q, $location, $timeout) {
            return checkLoggedOut($http, $q, $location, $timeout);
          }
        }
      })
      .state('createContest', {
        url: '/contests/create',
        templateUrl: 'smartTools/views/system/createContest.html',
        resolve: {
          loggedin: function($http, $q, $location, $timeout) {
            return checkLoggedOut($http, $q, $location, $timeout);
          }
        }
      })
      .state('updateContest', {
        url: '/contests/update/:contestId',
        templateUrl: 'smartTools/views/system/updateContest.html',
        resolve: {
          loggedin: function($http, $q, $location, $timeout) {
            return checkLoggedOut($http, $q, $location, $timeout);
          }
        }
      })
      .state('contest', {
        url: '/contest/:contestId',
        templateUrl: 'smartTools/views/system/contest.html',
        resolve: {
          loggedin: function($http, $q, $location, $timeout) {
            return checkLoggedOut($http, $q, $location, $timeout);
          }
        }
      })
      .state('public', {
        url: '/smarttools/:contestId',
        templateUrl: 'smartTools/views/system/publicContest.html'
      })
      .state('createVideo', {
        url: '/smarttools/:contestId/video/create',
        templateUrl: 'smartTools/views/system/createVideo.html',
      });
  }
]).config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.html5Mode({
      enabled:true,
      requireBase:false
    });
  }
]);
