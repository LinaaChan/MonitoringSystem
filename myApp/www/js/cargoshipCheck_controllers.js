angular.module('cargoship.controllers', [])
  /*液货船作业检查模块控制器*/
/*
  此页面暂时被删除，船舶还没分类
  .controller('cargoshipCtrl', function($scope,$stateParams,$state) {
    console.log($stateParams.keyword);
  })
*/

  .controller('oilShipCheckCtrl', function($scope,$q,$state,$http) {
  /* $scope.selected= [
       {"name":"A部分-通用-实际","value":"partA"},
       {"name":"B部分-通用-口头","value":"partB"},
       {"name":"C部分-散液-口头","value":"partC"},
       {"name":"D部分-液化气-口头","value":"partD"}
       ]*/
    $scope.change = function (param) {
      var defer = $q.defer();
      $http({
        method: 'get',
        url: './templates/cargoship.json'
      }).success(function (data) {
        defer.resolve(data);
        if(param=='partA'){
          $scope.data = data.cargoshipInfo.partA;
        }else if(param=='partB'){
          $scope.data = data.cargoshipInfo.partB;
        }else if(param=='partC'){
          $scope.data = data.cargoshipInfo.partC;
        }else{
          $scope.data = data.cargoshipInfo.partD;
        }
        $scope.goToDetail = function (proname) {
          $state.go('checktable_detail',{proName:proname,param:param})
        }
      }).error(function (data) {
        defer.reject(data);
      })
    }

  })
  .controller('checkTableDetailCtrl', function($scope,$stateParams,$q,$http) {
    var defer = $q.defer();
    $scope.param = $stateParams.param;
    $scope.proName = $stateParams.proName;
    $http({
      method: 'get',
      url: './templates/cargoship.json'
    }).success(function (data) {
      defer.resolve(data);
      if($scope.param=='partA'){
        for(var i=0;i<data.cargoshipInfo.partA.length;i++){
          if($scope.proName==data.cargoshipInfo.partA[i].proName){
            $scope.detailData = data.cargoshipInfo.partA[i].proContent;
          }
        }
      }else if($scope.param=='partB'){
        for(var i=0;i<data.cargoshipInfo.partB.length;i++){
          if($scope.proName==data.cargoshipInfo.partB[i].proName){
            $scope.detailData = data.cargoshipInfo.partB[i].proContent;
          }
        }
      }else if($scope.param=='partC'){
        for(var i=0;i<data.cargoshipInfo.partC.length;i++){
          if($scope.proName==data.cargoshipInfo.partC[i].proName){
            $scope.detailData = data.cargoshipInfo.partC[i].proContent;
          }
        }
      }else{
        for(var i=0;i<data.cargoshipInfo.partD.length;i++){
          if($scope.proName==data.cargoshipInfo.partD[i].proName){
            $scope.detailData = data.cargoshipInfo.partD[i].proContent;
          }
        }
      }
    }).error(function (data) {
      defer.reject(data);
    })
  })
  .controller('cargoshipSearchCtrl', function($scope,$stateParams,$state) {
    $scope.input = {'content':''}
    $scope.search = function(){
      $state.go('cargoship_searchresult',{cargoSearchWord:$scope.input.content})
    }
  })
  .controller('cargoshipSearchResultCtrl', function($scope,$stateParams,$state,$q,$http) {

  $scope.searchResult = [];
    var defer = $q.defer();
    $http({
      method: 'get',
      url: './templates/cargoship.json'
    }).success(function (data) {
      defer.resolve(data);
      /*搜索项目的名称*/
      for(var i=0;i<data.cargoshipInfo.partA.length;i++){
        if(data.cargoshipInfo.partA[i].proContent.proTitle==$stateParams.cargoSearchWord){
          $scope.searchResult.push({'itemTitle':data.cargoshipInfo.partA[i].proContent.proTitle,'itemName':data.cargoshipInfo.partA[i].proName,'part':'partA'});
        }
      }for(var i=0;i<data.cargoshipInfo.partB.length;i++){
        if(data.cargoshipInfo.partB[i].proContent.proTitle==$stateParams.cargoSearchWord){
          $scope.searchResult.push({'itemTitle':data.cargoshipInfo.partB[i].proContent.proTitle,'itemName':data.cargoshipInfo.partB[i].proName,'part':'partB'});
        }
      }for(var i=0;i<data.cargoshipInfo.partC.length;i++){
        if(data.cargoshipInfo.partC[i].proContent.proTitle==$stateParams.cargoSearchWord){
          $scope.searchResult.push({'itemTitle':data.cargoshipInfo.partC[i].proContent.proTitle,'itemName':data.cargoshipInfo.partC[i].proName,'part':'partC'});
        }
      }for(var i=0;i<data.cargoshipInfo.partD.length;i++){
        if(data.cargoshipInfo.partD[i].proContent.proTitle==$stateParams.cargoSearchWord){
          $scope.searchResult.push({'itemTitle':data.cargoshipInfo.partC[i].proContent.proTitle,'itemName':data.cargoshipInfo.partC[i].proName,'part':'partD'});
        }
        $scope.searchNote = "----------找不到匹配结果-----------";
      }
      $scope.goToDetail = function (proname,param) {
        $state.go('checktable_detail',{proName:proname,param:param})
      }
    }).error(function (data) {
      defer.reject(data);
    })

  })

