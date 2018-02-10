angular.module('cargoship.controllers', [])
  /*液货船作业检查模块控制器*/
/*
  此页面暂时被删除，船舶还没分类
  .controller('cargoshipCtrl', function($scope,$stateParams,$state) {
    console.log($stateParams.keyword);
  })
*/

  .controller('oilShipCheckCtrl', function($scope,$state,$cordovaFile) {

    $cordovaFile.readAsText(cordova.file.externalDataDirectory, "cargoship.json")
      .then(function (data) {
       var data_json = angular.fromJson(data);//将读取的文件转成json格式
        $scope.partA_data = jsonsql.query("select * from json.cargoshipInfo where (part=='partA')",data_json);
        $scope.partB_data = jsonsql.query("select * from json.cargoshipInfo where (part=='partB')",data_json);
        $scope.partC_data = jsonsql.query("select * from json.cargoshipInfo where (part=='partC')",data_json);
        $scope.partD_data = jsonsql.query("select * from json.cargoshipInfo where (part=='partD')",data_json);
        $scope.groups= [
          {"name":"A部分-通用-实际","value":"partA","items": $scope.partA_data, show: false},
          {"name":"B部分-通用-口头","value":"partB","items": $scope.partB_data, show: false},
          {"name":"C部分-散液-口头","value":"partC","items": $scope.partC_data, show: false},
          {"name":"D部分-液化气-口头","value":"partD","items":$scope.partD_data, show: false}
        ]
        $scope.goToDetail = function (proname,param) {
          $state.go('checktable_detail',{proName:proname,param:param})
        }
      }, function (error) {
        // error
      });
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
  .controller('checkTableDetailCtrl', function($scope,$stateParams,$ionicModal,$cordovaFile) {

    $scope.param = $stateParams.param;
    $scope.proName = $stateParams.proName;
    $cordovaFile.readAsText(cordova.file.externalDataDirectory, "cargoship.json")
      .then(function (data) {
        var data_json = angular.fromJson(data);//将读取的文件转成json格式
        $scope.result = jsonsql.query("select * from json.cargoshipInfo where (part=='"+$scope.param+"' && proName=='"+$scope.proName+"') order by proTitle",data_json);
        $scope.detailData = $scope.result[0];
        //展开模型，显示检查依据的详细信息
        $ionicModal.fromTemplateUrl('my-modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.modal = modal;
        });
      }, function (error) {
        // error
      });

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
  .controller('cargoshipSearchResultCtrl', function($scope,$stateParams,$state,$cordovaFile) {

    $scope.searchResult = [];  //搜索结果数组
    $cordovaFile.readAsText(cordova.file.externalDataDirectory, "cargoship.json")
      .then(function (data) {
        var data_json = angular.fromJson(data);//将读取的文件转成json格式
        /*搜索项目的名称*/
        /*使用正则表达式匹配完成模糊搜索*/
        var reg = new RegExp($stateParams.cargoSearchWord);
        //循环需要查询的数组
        for(var i=0;i<data_json.cargoshipInfo.length;i++){
          if(data_json.cargoshipInfo[i].proName.match(reg)||data_json.cargoshipInfo[i].proTitle.match(reg))
            $scope.searchResult.push(data_json.cargoshipInfo[i]);
        }
        $scope.searchNote = "----------找不到匹配结果-----------";
        $scope.goToDetail = function (proname,param) {
          $state.go('checktable_detail',{proName:proname,param:param})
        }
      }, function (error) {
        // error
      });

  })

