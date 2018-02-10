angular.module('emergencySupport.controllers', [])
/*应急处理装置模块控制器*/
  .controller('allDangerGoodEmergencyCtrl', function($scope,$cordovaFile,$state) {
    $cordovaFile.readAsText(cordova.file.externalDataDirectory, "emergency.json")
      .then(function (data_read) {
        var data = angular.fromJson(data_read);//将读取的文件转成json格式
        $scope.data = data.Emergency.sort(function(a,b){
          return a.capital.localeCompare(b.capital);
        });
      }, function (error) {
        // error
      });

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
  .controller('emergencySupportDetailCtrl', function($scope,$stateParams,$cordovaFile,$state) {
    $scope.goodName=$stateParams.emergency_goodname;
    $cordovaFile.readAsText(cordova.file.externalDataDirectory, "emergency.json")
      .then(function (data_read) {
        var data = angular.fromJson(data_read);//将读取的文件转成json格式
        for(var i=0;i<data.Emergency.length;i++){
          //  $scope.result = jsonsql.query("select ChineseName from json.DBInfo where (ChineseName=='"+$stateParams.searchGood+"' || Unnum=='"+$stateParams.searchUN+"' || classification=='"+$stateParams.dangerGoodClass+"') order by ChineseName",data);
          if(data.Emergency[i].ChineseName==$scope.goodName){
            $scope.emergencyMethod = data.Emergency[i];
          }
        }
      }, function (error) {
        // error
      });

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
 .controller('emergencySearchResultCtrl', function($scope,$state,$cordovaFile,$stateParams) {

   $scope.searchResult=[];
   $cordovaFile.readAsText(cordova.file.externalDataDirectory, "emergency.json")
     .then(function (data_read) {
       var data = angular.fromJson(data_read);//将读取的文件转成json格式
       var reg = new RegExp($stateParams.emergencySearchWord);
       //循环需要查询的数组
       for(var i=0;i<data.Emergency.length;i++){
         if(data.Emergency[i].ChineseName.match(reg))
           $scope.searchResult.push(data.Emergency[i].ChineseName);
       }
       $scope.searchNote="----------找不到相应货物-----------";
     }, function (error) {
       // error
     });

   $scope.goToDetail = function (goodName) {
     $state.go('emergencysupport_detail',{emergency_goodname:goodName});
   }

  })
