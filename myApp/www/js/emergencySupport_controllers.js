angular.module('emergencySupport.controllers', [])
/*应急处理装置模块控制器*/
  .controller('allDangerGoodEmergencyCtrl', function($scope,$q,$http,$state) {
    var defer = $q.defer();
    $http({
      method: 'get',
      url: './templates/emergency.json'
    }).success(function (data) {
      defer.resolve(data);
      $scope.data = data.Emergency;
    }).error(function (data) {
      defer.reject(data);
    })
    $scope.goToDetail = function (goodName) {
      $state.go('emergencysupport_detail',{emergency_goodname:goodName});
    }
  })
  .controller('emergencySupportDetailCtrl', function($scope,$stateParams,$q,$http) {
    $scope.goodName=$stateParams.emergency_goodname;
    var defer = $q.defer();
    $http({
      method: 'get',
      url: './templates/emergency.json'
    }).success(function (data) {
      defer.resolve(data);
      for(var i=0;i<data.Emergency.length;i++){
        if(data.Emergency[i].ChineseName==$scope.goodName){
          $scope.emergencyMethod = data.Emergency[i];
        }
      }
    }).error(function (data) {
      defer.reject(data);
    })
  })
  .controller('dangerGoodEmergencyCtrl', function($scope,$state) {
    $scope.goToDetail = function (goodName) {
      $state.go('emergencysupport_detail',{emergency_goodname:goodName});
    }
  })
  .controller('emergencySearchCtrl', function($scope,$state) {
    $scope.input = {'content':''};
    $scope.search = function () {
      if($scope.input.content==''||$scope.input.content==undefined){
        alert('搜索内容不能为空');
      }else{
        $state.go('emergency_searchresult',{emergencySearchWord:$scope.input.content})
      }
    }

  })
 .controller('emergencySearchResultCtrl', function($scope,$state,$q,$http,$stateParams) {
    $scope.searchResult=[];
    var defer = $q.defer();
    $http({
        method: 'get',
        url: './templates/emergency.json'
      }).success(function (data) {
        defer.resolve(data);
        $scope.data = data.Emergency;
        for(var i=0;i<$scope.data.length;i++){
          if($scope.data[i].ChineseName==$stateParams.emergencySearchWord){
            $scope.searchResult.push($scope.data[i].ChineseName);
          }else {
            $scope.searchNote="----------找不到相应货物-----------";
          }
        }
      }).error(function (data) {
        defer.reject(data);
    })
   $scope.goToDetail = function (goodName) {
     $state.go('emergencysupport_detail',{emergency_goodname:goodName});
   }

  })
