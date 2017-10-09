angular.module('cargoship.controllers', [])
  /*液货船作业检查模块控制器*/
/*
  此页面暂时被删除，船舶还没分类
  .controller('cargoshipCtrl', function($scope,$stateParams,$state) {
    console.log($stateParams.keyword);
  })
*/

  .controller('oilShipCheckCtrl', function($scope,$q,$state,$http) {
    var defer = $q.defer();
    $http({
      method: 'get',
      url: './templates/cargoship.json'
    }).success(function (data) {
      defer.resolve(data);
      $scope.partA_data = jsonsql.query("select * from json.cargoshipInfo where (part=='partA')",data);
      $scope.partB_data = jsonsql.query("select * from json.cargoshipInfo where (part=='partB')",data);
      $scope.partC_data = jsonsql.query("select * from json.cargoshipInfo where (part=='partC')",data);
      $scope.partD_data = jsonsql.query("select * from json.cargoshipInfo where (part=='partD')",data);
      $scope.groups= [
        {"name":"A部分-通用-实际","value":"partA","items": $scope.partA_data, show: false},
        {"name":"B部分-通用-口头","value":"partB","items": $scope.partB_data, show: false},
        {"name":"C部分-散液-口头","value":"partC","items": $scope.partC_data, show: false},
        {"name":"D部分-液化气-口头","value":"partD","items":$scope.partD_data, show: false}
      ]
      $scope.goToDetail = function (proname,param) {
        $state.go('checktable_detail',{proName:proname,param:param})
      }
    }).error(function (data) {
      defer.reject(data);
    })
        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.toggleGroup = function(group) {
          group.show = !group.show;
        };
        $scope.isGroupShown = function(group) {
          return group.show;
        }
  })
  .controller('checkTableDetailCtrl', function($scope,$stateParams,$q,$http) {
    var defer = $q.defer();
    $scope.param = $stateParams.param;
    $scope.proName = $stateParams.proName;
    console.log($scope.param);
    console.log($scope.proName);
    $http({
      method: 'get',
      url: './templates/cargoship.json'
    }).success(function (data) {
      defer.resolve(data);
      $scope.result = jsonsql.query("select * from json.cargoshipInfo where (part=='"+$scope.param+"' && proName=='"+$scope.proName+"') order by proTitle",data);
      console.log($scope.result);
      $scope.detailData = $scope.result[0];
      /*if($scope.param=='partA'){
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
      }*/
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
  console.log($stateParams.cargoSearchWord);
  $scope.searchResult = [];
    var defer = $q.defer();
    $http({
      method: 'get',
      url: './templates/cargoship.json'
    }).success(function (data) {
      defer.resolve(data);
      /*搜索项目的名称*/
      $scope.searchResult = jsonsql.query("select * from json.cargoshipInfo where (proTitle=='"+$stateParams.cargoSearchWord+"' || proName=='"+$stateParams.cargoSearchWord+"')",data);
     /* for(var i=0;i<data.cargoshipInfo.partA.length;i++){
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

      }*/
      $scope.searchNote = "----------找不到匹配结果-----------";
      $scope.goToDetail = function (proname,param) {
        $state.go('checktable_detail',{proName:proname,param:param})
      }
    }).error(function (data) {
      defer.reject(data);
    })

  })

