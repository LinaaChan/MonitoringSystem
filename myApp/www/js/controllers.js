angular.module('starter.controllers', [])

  .controller('homepageCtrl', function($scope,$state) {
    $scope.gotoCargo = function (params) {
     $state.go('cargoshipcheck',{'keyword':params});
    }
    $scope.gotoDangerousGoods = function (params) {
     $state.go('dangerousgoods');
    }
  })
  .controller('cargoshipCtrl', function($scope,$stateParams) {

    console.log($stateParams.keyword);

  })
  .controller('allDangerGoodCtrl', function($scope,$http,$q,$state) {
    var defer = $q.defer();
    $http({
      method: 'get',
      url: './templates/info.json'
    }).success(function (data) {
      defer.resolve(data);
      $scope.data = data.info;
      console.log($scope.data);
    }).error(function (data) {
      defer.reject(data);
    })
    $scope.goToDetail = function (goodName) {
      $state.go('dangerousgoodsdetails',{goodName:goodName});
    }
  })
   .controller('dangerGoodDetailCtrl', function($scope,$stateParams,$http,$q,$state) {
     $scope.goodName = $stateParams.goodName;
     $scope.goToProperty = function (goodName) {
       $state.go('goodproperty',{goodNameForProperty:$stateParams.goodName});
     }
     $scope.goToIBCIGC = function (goodName) {
       $state.go('IBCIGC',{goodNameIBCIGC:$stateParams.goodName});
     }
     $scope.goToOilFence = function (goodName) {
       $state.go('oilFence',{goodNameoilFence:$stateParams.goodName});
     }
  })
  .controller('goodPropertyCtrl', function($scope,$stateParams,$http,$q,$state) {
    $scope.goodName = $stateParams.goodNameForProperty;
    var defer = $q.defer();
    $http({
      method: 'get',
      url: './templates/info.json'
    }).success(function (data) {
      defer.resolve(data);
      for(var i=0;i<data.info.length;i++){
        if(data.info[i].ChineseName==$scope.goodName){
          $scope.detailInfo = data.info[i].property;
          console.log($scope.detailInfo);
        }
      }
    }).error(function (data) {
      defer.reject(data);
    })
  })
  .controller('IBCIGCCtrl', function($scope,$stateParams,$http,$q,$state) {
    $scope.goodName = $stateParams.goodNameIBCIGC;
    var defer = $q.defer();
    $http({
      method: 'get',
      url: './templates/info.json'
    }).success(function (data) {
      defer.resolve(data);
      for(var i=0;i<data.info.length;i++){
        if(data.info[i].ChineseName==$scope.goodName){
          $scope.detailInfo = data.info[i].IBCIGC;
          console.log($scope.detailInfo);
        }
      }
    }).error(function (data) {
      defer.reject(data);
    })
  })
  .controller('oilFenceCtrl', function($scope,$stateParams,$http,$q,$state) {
    $scope.goodName = $stateParams.goodNameoilFence;

  })
  .controller('classSearchCtrl', function($scope,$state) {
    $scope.search_good = function () {
     if($scope.good_name==undefined&&$scope.un_num==undefined&&$scope.dork==undefined&&$scope.class==undefined){
       alert('搜索条件不能全为空');
     }else{
       $state.go('searchResult',{searchGood:$scope.good_name,searchUN:$scope.un_num,dork:$scope.dork,dangerGoodClass:$scope.class})
     }
    }
  })
  .controller('searchResultCtrl', function($scope,$stateParams) {
    console.log($stateParams.searchGood);
    console.log($stateParams.searchUN);
    console.log($stateParams.dork);
    console.log($stateParams.dangerGoodClass);
    
  })
