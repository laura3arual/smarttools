'use strict';

//Setting up route
angular.module('mean.smartTools').config(['$meanStateProvider',
  function($meanStateProvider) {

    // states for users
    $meanStateProvider
      .state('auth', {
        url: '/auth',
        abstract: true,
        templateUrl: 'smartTools/views/users/index.html'
      })
      .state('auth.login', {
        url: '/login',
        templateUrl: 'smartTools/views/users/login.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedOut();
          }
        }
      })
      .state('auth.register', {
        url: '/register',
        templateUrl: 'smartTools/views/users/register.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedOut();
          }
        }
      })
      .state('forgot-password', {
        url: '/forgot-password',
        templateUrl: 'smartTools/views/users/forgot-password.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedOut();
          }
        }
      })
      .state('reset-password', {
        url: '/reset/:tokenId',
        templateUrl: 'smartTools/views/users/reset-password.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedOut();
          }
        }
      });
  }
]);
