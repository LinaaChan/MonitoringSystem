// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers','cargoship.controllers','dangerousGoods.controllers','emergencySupport.controllers'])

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
      /*由于没有分类暂时先去掉这个船舶种类的页面，html暂时不删除*/
      /*.state('cargoshipcheck', {
        url: '/cargoshipcheck/:keyword',
        templateUrl: 'templates/cargoship_check.html',
        controller: 'cargoshipCtrl'
      })*/
     /* .state('cargoship_search', {
        url: '/cargoship_search',
        templateUrl: 'templates/cargoship_search.html',
        controller: 'cargoshipSearchCtrl'
      })*/
      .state('cargoship_searchresult', {
        url: '/cargoship_searchresult/:cargoSearchWord',
        templateUrl: 'templates/cargoship_searchresult.html',
        controller: 'cargoshipSearchResultCtrl'
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
    .state('classificationSearch', {
        url: '/classificationSearch',
        templateUrl: 'templates/classification_search.html',
        controller: 'classSearchCtrl'
      })
   .state('searchResult', {
        url: '/searchResult/:searchGood/:searchUN/:dork/:dangerGoodClass',
        templateUrl: 'templates/search_result.html',
        controller: 'searchResultCtrl'
      })
   .state('dangergoods_emergency', {
        url: '/dangergoods_emergency',
        templateUrl: 'templates/dangerousgoods_emergency.html',
        controller:'dangerGoodEmergencyCtrl'
      })
      .state('alldangergoods_emergency', {
        url: '/alldangergoods_emergency',
        templateUrl: 'templates/alldangerousgoods_emergency.html',
        controller:'allDangerGoodEmergencyCtrl'
      })
      .state('emergencysupport_detail', {
        url: '/emergencysupport_detail/:emergency_goodname',
        templateUrl: 'templates/emergencysupport_details.html',
        controller:'emergencySupportDetailCtrl'
      })
      .state('oilshipcheck', {
        url: '/oilshipcheck',
        templateUrl: 'templates/oilship_check.html',
        controller:'cargoshipSearchCtrl'
      })
      .state('checktable', {
        url: '/checktable',
        templateUrl: 'templates/according_to_checktable.html',
        controller:'oilShipCheckCtrl'
      })
      .state('checktable_detail', {
        url: '/checktable_detail/:proName/:param',
        templateUrl: 'templates/checktable_detail.html',
        controller:'checkTableDetailCtrl'
      })
      .state('emergency_search', {
        url: '/emergency_search',
        templateUrl: 'templates/emergency_search.html',
        controller:'emergencySearchCtrl'
      })
      .state('emergency_searchresult', {
        url: '/emergency_searchresult/:emergencySearchWord',
        templateUrl: 'templates/emergency_searchresult.html',
        controller:'emergencySearchResultCtrl'
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/homepage');

  });
