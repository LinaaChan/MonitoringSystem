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
  .controller('checkTableDetailCtrl', function($scope,$stateParams,$q,$http,$ionicModal) {
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
       //展开模型，显示检查依据的详细信息
      $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });
    /*  $scope.openModal = function() {
        $scope.modal.show();
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
      };*/
    }).error(function (data) {
      defer.reject(data);
    })
  })
  .controller('cargoshipSearchCtrl', function($scope,$stateParams,$state) {
    $scope.input = {'content':''}
    $scope.search = function(){
      if($scope.input.content==''){
        alert("关键字不能为空");
      }else{
        $state.go('cargoship_searchresult',{cargoSearchWord:$scope.input.content})
      }
    }
  })
  .controller('cargoshipSearchResultCtrl', function($scope,$stateParams,$state,$q,$http) {
  console.log($stateParams.cargoSearchWord);
  $scope.searchResult = [];  //搜索结果数组
    var defer = $q.defer();
    $http({
      method: 'get',
      url: './templates/cargoship.json'
    }).success(function (data) {
      defer.resolve(data);
      /*搜索项目的名称*/
      /*使用正则表达式匹配完成模糊搜索*/
      var reg = new RegExp($stateParams.cargoSearchWord);
      //循环需要查询的数组
      for(var i=0;i<data.cargoshipInfo.length;i++){
        if(data.cargoshipInfo[i].proName.match(reg)||data.cargoshipInfo[i].proTitle.match(reg))
          $scope.searchResult.push(data.cargoshipInfo[i]);
      }
      $scope.searchNote = "----------找不到匹配结果-----------";
      $scope.goToDetail = function (proname,param) {
        $state.go('checktable_detail',{proName:proname,param:param})
      }
    }).error(function (data) {
      defer.reject(data);
    })

  })

