angular.module('emergencySupport.controllers', [])
/*应急处理装置模块控制器*/
  .controller('allDangerGoodEmergencyCtrl', function($scope,$q,$http,$state) {
    var defer = $q.defer();
    $http({
      method: 'get',
      url: './templates/emergency.json'
    }).success(function (data) {
      defer.resolve(data);
      $scope.data = data.Emergency.sort(function(a,b){
        return a.capital.localeCompare(b.capital);
      });
    }).error(function (data) {
      defer.reject(data);
    })
    $scope.goToDetail = function (goodName,type) {
      $state.go('emergencysupport_detail',{emergency_goodname:goodName,goodtype_emer:type});
    }
    $scope.input = {'content':''};
    $scope.search = function () {
      if($scope.input.content==''||$scope.input.content==undefined){
        alert('搜索内容不能为空');
      }else{
        $state.go('emergency_searchresult',{emergencySearchWord:$scope.input.content})
      }
    }
  })
  .controller('emergencySupportDetailCtrl', function($scope,$stateParams,$q,$http,$state) {
    $scope.goodName=$stateParams.emergency_goodname;
    var defer = $q.defer();
    $http({
      method: 'get',
      url: './templates/emergency.json'
    }).success(function (data) {
      defer.resolve(data);
      for(var i=0;i<data.Emergency.length;i++){
        //  $scope.result = jsonsql.query("select ChineseName from json.DBInfo where (ChineseName=='"+$stateParams.searchGood+"' || Unnum=='"+$stateParams.searchUN+"' || classification=='"+$stateParams.dangerGoodClass+"') order by ChineseName",data);
        if(data.Emergency[i].ChineseName==$scope.goodName){
          $scope.emergencyMethod = data.Emergency[i];
        }
      }
    }).error(function (data) {
      defer.reject(data);
    })
    $scope.goToGood = function () {
      $state.go('dangerousgoodsdetails',{goodName:$stateParams.emergency_goodname,goodType:$stateParams.goodtype_emer})
    }
  })
  .controller('dangerGoodEmergencyCtrl', function($scope,$state) {
    $scope.goToDetail = function (goodName,type) {
      $state.go('emergencysupport_detail',{emergency_goodname:goodName,goodtype_emer:type});
    }
  })
  /*需要删除*/
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
    console.log($stateParams.emergencySearchWord);
    var defer = $q.defer();
    $http({
        method: 'get',
        url: './templates/emergency.json'
      }).success(function (data) {
        defer.resolve(data);
        var reg = new RegExp($stateParams.emergencySearchWord);
        //循环需要查询的数组
        for(var i=0;i<data.Emergency.length;i++){
          if(data.Emergency[i].ChineseName.match(reg))
            $scope.searchResult.push(data.Emergency[i].ChineseName);
        }
        $scope.searchNote="----------找不到相应货物-----------";

      }).error(function (data) {
        defer.reject(data);
    })
   $scope.goToDetail = function (goodName) {
     $state.go('emergencysupport_detail',{emergency_goodname:goodName});
   }

  })
