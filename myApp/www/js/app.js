// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers','cargoship.controllers','dangerousGoods.controllers','emergencySupport.controllers','starter.services'])

.run(function($ionicPlatform,$ionicPopup,$location,$ionicHistory) {
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
  $ionicPlatform.registerBackButtonAction(function (e) {
    function showConfirm() {
      var confirmPopup = $ionicPopup.confirm({
        title: '<strong>退出应用?</strong>',
        template: '你确定要退出应用吗?',
        okText: '退出',
        cancelText: '取消'
      });
      confirmPopup.then(function (res) {
        if (res) {
          ionic.Platform.exitApp();
        } else {
          // Don't close
        }
      });
    }
    //判断处于哪个页面时双击退出
    if ($location.path() == '/homepage' ) {
      showConfirm();
    } else if ($ionicHistory.backView() ) {
      $ionicHistory.goBack();
    } else {
      // This is the last page: Show confirmation popup
      showConfirm();
    }
    e.preventDefault();
    return false;
  }, 101);

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
      .state('loginPage', {
        url: '/loginPage',
        templateUrl: 'templates/loginPage.html',
        controller:'loginPageCtrl',
        cache:false
      })
      .state('changePwd', {
        url: '/changePwd/:account',
        templateUrl: 'templates/changePwd.html',
        controller:'changePwdCtrl'
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
      /*模块一级界面1，危险货物数据库*/
      .state('dangerousgoods', {
        url: '/dangerousgood',
        templateUrl: 'templates/dangerousgoodsDB.html',
        controller: 'dangerousgoodsDBCtrl'
      })
      /*模块一级界面2，所有危险货物数据库*/
      .state('alldangerousgoods', {
        url: '/alldangerousgood',
        templateUrl: 'templates/alldangerousgoods.html',
        controller: 'allDangerGoodCtrl'
      })
      /*模块二级界面,货物特性和船舶适载要求*/
      .state('dangerousgoodsdetails', {
        url: '/dangerousgoodsdetails/:goodName/:goodType',
        templateUrl: 'templates/dangerousgoods_details.html',
        controller: 'dangerGoodDetailCtrl'
      })
      /*模块三级界面1，货物特性列表：基本信息、理化特性、作业要求*/
      .state('goodpropertylist', {
        url: '/goodpropertylist/:checkGoodName',
        templateUrl: 'templates/goodproperty_list.html',
        controller: 'goodPropertyListCtrl'
      })
      /*模块三级界面2，船舶适载要求：构造要求、设备要求、适载要求*/
      .state('cargoshiplist', {
        url: '/cargoshiplist/:checkCargoShip',
        templateUrl: 'templates/cargoRquirement.html',
        controller: 'cargoShipListCtrl'
      })
      /*模块四级页面1,基本信息页面，参数*/
      .state('goodproperty_basicInfo', {
        url: '/goodproperty_basicInfo/:goodNameForBasicInfo',
        templateUrl: 'templates/goodproperty_basicInfo.html',
        controller: 'goodPropertyBasicInfoCtrl'
      })
      /*模块四级页面2,理化特性页面，参数*/
      .state('goodproperty_chemistry', {
        url: '/goodproperty_chemistry/:goodNameForChemistry',
        templateUrl: 'templates/goodproperty_chemistry.html',
        controller: 'goodPropertyChemistryCtrl'
      })
      /*模块四级页面3,作业要求：围油栏、船舶污染清除协议（1万总吨以下）*/
      .state('goodproperty_workRequirement', {
        url: '/goodproperty_workRequirement/:goodNameForRequirement',
        templateUrl: 'templates/goodproperty_requirement.html',
        controller: 'goodPropertyRequirementCtrl'
      })
      /*模块四级页面4,船舶适载要求-构造要求*/
      .state('infrastructure_requirement', {
        url: '/infrastructure_requirement/:goodNameInfrastructure',
        templateUrl: 'templates/infrastructure_requirement.html',
        controller: 'infrastructureRequirementCtrl'
      })
      /*模块四级页面5,船舶适载要求-设备要求*/
      .state('equipment_requirement', {
        url: '/equipment_requirement/:goodNameEquipment',
        templateUrl: 'templates/equipment_requirement.html',
        controller: 'equipmentRequirementCtrl'
      })
      /*模块四级页面6,船舶适载要求-特殊要求*/
      .state('special_requirement', {
        url: '/special_requirement/:goodNameSpecial',
        templateUrl: 'templates/special_requirement.html',
        controller: 'specialRequirementCtrl'
      })
   /*   .state('IBCIGC', {
        url: '/IBCIGC/:goodNameIBCIGC',
        templateUrl: 'templates/IBCIGCRequirement.html',
        controller: 'IBCIGCCtrl'
      })
      .state('oilFence', {
        url: '/oilFence/:goodNameoilFence',
        templateUrl: 'templates/oilFence.html',
        controller: 'oilFenceCtrl'
      })*/
    .state('classificationSearch', {
        url: '/classificationSearch',
        templateUrl: 'templates/classification_search.html',
        controller: 'classSearchCtrl'
      })
   .state('searchResult', {
        url: '/searchResult/:searchGood/:searchUN/:dangerGoodClass',
        templateUrl: 'templates/search_result.html',
        controller: 'classSearchResultCtrl'
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
        url: '/emergencysupport_detail/:emergency_goodname/:goodtype_emer',
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
      .state('dangergood_result', {
        url: '/dangergood_result/:dangerSearchWord',
        templateUrl: 'templates/dangergood_searchresult.html',
        controller:'searchResultCtrl'
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
    $urlRouterProvider.otherwise('/loginPage');

  });
