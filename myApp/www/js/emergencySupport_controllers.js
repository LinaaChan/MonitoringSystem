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
