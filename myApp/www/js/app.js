// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
  .config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $stateProvider

      // Each tab has its own nav history stack:
      .state('homepage', {
        url: '/homepage',
        templateUrl: 'templates/homepage.html',
        controller: 'homepageCtrl'
      })
      .state('cargoshipcheck', {
        url: '/cargoshipcheck/:keyword',
        templateUrl: 'templates/cargoship_check.html',
        controller: 'cargoshipCtrl'
      })
      .state('dangerousgoods', {
        url: '/dangerousgood',
        templateUrl: 'templates/dangerousgoodsDB.html',
        //controller: 'cargoshipCtrl'
      })
      .state('alldangerousgoods', {
        url: '/alldangerousgood',
        templateUrl: 'templates/alldangerousgoods.html',
        controller: 'allDangerGoodCtrl'
      })
      .state('dangerousgoodsdetails', {
        url: '/dangerousgoodsdetails/:goodName',
        templateUrl: 'templates/dangerousgoods_details.html',
        controller: 'dangerGoodDetailCtrl'
      })
      .state('goodproperty', {
        url: '/goodproperty/:goodNameForProperty',
        templateUrl: 'templates/goodproperty.html',
        controller: 'goodPropertyCtrl'
      })
      .state('IBCIGC', {
        url: '/IBCIGC/:goodNameIBCIGC',
        templateUrl: 'templates/IBCIGCRequirement.html',
        controller: 'IBCIGCCtrl'
      })
      .state('oilFence', {
        url: '/oilFence/:goodNameoilFence',
        templateUrl: 'templates/oilFence.html',
        controller: 'oilFenceCtrl'
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/homepage');

  });
