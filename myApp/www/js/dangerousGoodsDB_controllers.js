angular.module('dangerousGoods.controllers', [])
/*危险货物数据库模块控制器*/

/*危险货物数据库控制器，模块一级界面1*/
  .controller('dangerousgoodsDBCtrl', function($scope,$stateParams,$state) {
    $scope.goToPropertyDetail = function (goodName,goodType) {
      $state.go('dangerousgoodsdetails',{goodName:goodName,goodType:goodType});//跳转到二级页面，传递参数goodName
    }
  })
  /*危险货物数据库控制器，模块一级界面2*/
  .controller('allDangerGoodCtrl', function($scope,$http,$cordovaFile) {
    $scope.input={'content':''}
    $cordovaFile.readAsText(cordova.file.externalDataDirectory, "DBInfo.json")
      .then(function (data) {
        var data_json = angular.fromJson(data);//将读取的文件转成json格式
        $scope.data =data_json.DBInfo.sort(function(a,b){
          return a.capital.localeCompare(b.capital);
        });
      }, function (error) {
        // error
      });
    $scope.do_search = function () {
      if($scope.input.content==''){
        alert("关键字不能为空！");
      }else {
        $state.go('dangergood_result',{'dangerSearchWord':$scope.input.content})
      }
    }
    $scope.goToDetail = function (goodName,goodType) {
      $state.go('dangerousgoodsdetails',{goodName:goodName,goodType:goodType});
    }
  })
  /*模块二级页面，货物特性和船舶适载要求*/
  .controller('dangerGoodDetailCtrl', function($scope,$stateParams,$state) {
    $scope.goodName = $stateParams.goodName;
    $scope.goodType = $stateParams.goodType;
    $scope.goToPropertyList = function () {
      $state.go('goodpropertylist',{checkGoodName:$stateParams.goodName});
    }
    $scope.goToCargoList = function () {
      $state.go('cargoshiplist',{checkCargoShip:$stateParams.goodName});
    }
    $scope.goToPropertyReuirement = function () {
      $state.go('goodproperty_workRequirement',{goodNameForRequirement:$stateParams.goodName});
    }
  })

/*模块三级页面1，货物特性列表：基本信息、理化特性、作业要求*/
  .controller('goodPropertyListCtrl', function($scope,$stateParams,$state) {
    $scope.goodName = $stateParams.checkGoodName;
    $scope.goToPropertyBasicInfo = function () {
      $state.go('goodproperty_basicInfo',{goodNameForBasicInfo:$stateParams.checkGoodName});
    }
    $scope.goToPropertyChemistry = function () {
      $state.go('goodproperty_chemistry',{goodNameForChemistry:$stateParams.checkGoodName});
    }
    $scope.goToPropertyReuirement = function () {
      $state.go('goodproperty_workRequirement',{goodNameForRequirement:$stateParams.checkGoodName});
    }
  })
  /*模块三级页面2，船舶适载要求列表：构造要求、设备要求、适载要求*/
  .controller('cargoShipListCtrl', function($scope,$stateParams,$state) {
    $scope.goodName = $stateParams.checkCargoShip;

    $scope.goToInfrastructure = function () {
      $state.go('infrastructure_requirement',{goodNameInfrastructure:$stateParams.checkCargoShip});
    }
    $scope.goToPropertyEquipment = function () {
      $state.go('equipment_requirement',{goodNameEquipment:$stateParams.checkCargoShip});
    }
    $scope.goToPropertySpecial = function () {
      $state.go('special_requirement',{goodNameSpecial:$stateParams.checkCargoShip});
    }
  })
/*基本信息页面：英文名、别名、种类、联合国编号、CAS编号、污染类别(有毒液体物质)、持久性（油类）、危害性（IBC）、分子式*/
  .controller('goodPropertyBasicInfoCtrl', function($scope,$stateParams,$cordovaFile) {
    $scope.goodName = $stateParams.goodNameForBasicInfo;
    $cordovaFile.readAsText(cordova.file.externalDataDirectory, "DBInfo.json")
      .then(function (data) {
        var data_json = angular.fromJson(data);//将读取的文件转成json格式
        for(var i=0;i<data_json.DBInfo.length;i++){
          if(data_json.DBInfo[i].ChineseName==$scope.goodName){
            $scope.detailInfo = data_json.DBInfo[i].basicInfo;
          }
        }
      }, function (error) {
        // error
      });

  })
  /*理化特性页面：熔点（凝固点）℃meltingpoint、沸点℃boilingpoint、闪点℃flashingpoint、爆炸上限 下限%boom、相对密度(水=1)density、溶解性dissolution
*/
  .controller('goodPropertyChemistryCtrl', function($scope,$stateParams,$cordovaFile) {
    $scope.goodName = $stateParams.goodNameForChemistry;
    $cordovaFile.readAsText(cordova.file.externalDataDirectory, "DBInfo.json")
      .then(function (data) {
        var data_json = angular.fromJson(data);//将读取的文件转成json格式
        for(var i=0;i<data_json.DBInfo.length;i++){
          if(data_json.DBInfo[i].ChineseName==$scope.goodName){
            $scope.detailInfo = data_json.DBInfo[i].property;
          }
        }
      }, function (error) {
        // error
      });

  })
  /*作业要求页面：围油栏oilfence、船舶污染清除协议（1万总吨以下）
*/
  .controller('goodPropertyRequirementCtrl', function($scope,$stateParams,$cordovaFile) {
    $scope.goodName = $stateParams.goodNameForRequirement;
    $cordovaFile.readAsText(cordova.file.externalDataDirectory, "DBInfo.json")
      .then(function (data) {
        var data_json = angular.fromJson(data);//将读取的文件转成json格式
        for(var i=0;i<data_json.DBInfo.length;i++){
          if(data_json.DBInfo[i].ChineseName==$scope.goodName){
            $scope.detailInfo = data_json.DBInfo[i].jobRequirements;
            console.log($scope.detailInfo );
          }
        }
      }, function (error) {
        // error
      });

  })
  /*构造要求页面*/
  .controller('infrastructureRequirementCtrl', function($scope,$stateParams,$cordovaFile) {
    $scope.goodName = $stateParams.goodNameInfrastructure;
    $cordovaFile.readAsText(cordova.file.externalDataDirectory, "DBInfo.json")
      .then(function (data) {
        var data_json = angular.fromJson(data);//将读取的文件转成json格式
        for(var i=0;i<data_json.DBInfo.length;i++){
          if(data_json.DBInfo[i].ChineseName==$scope.goodName){
            $scope.detailInfo = data_json.DBInfo[i];
          }
        }
      }, function (error) {
        // error
      });

  })
  /*设备要求页面*/
  .controller('equipmentRequirementCtrl', function($scope,$stateParams,$cordovaFile) {
    $scope.goodName = $stateParams.goodNameEquipment;
    $cordovaFile.readAsText(cordova.file.externalDataDirectory, "DBInfo.json")
      .then(function (data) {
        var data_json = angular.fromJson(data);//将读取的文件转成json格式
        for(var i=0;i<data_json.DBInfo.length;i++){
          if(data_json.DBInfo[i].ChineseName==$scope.goodName){
            $scope.detailInfo = data_json.DBInfo[i];
          }
        }
      }, function (error) {
        // error
      });
  })
  /*特殊要求页面*/
  .controller('specialRequirementCtrl', function($scope,$stateParams,$cordovaFile) {
    $scope.goodName = $stateParams.goodNameSpecial;
    $cordovaFile.readAsText(cordova.file.externalDataDirectory, "DBInfo.json")
      .then(function (data) {
        var data_json = angular.fromJson(data);//将读取的文件转成json格式
        for(var i=0;i<data_json.DBInfo.length;i++){
          if(data_json.DBInfo[i].ChineseName==$scope.goodName){
            $scope.detailInfo = data_json.DBInfo[i];
          }
        }
      }, function (error) {
        // error
      });
  })

//单独的搜索页面
  .controller('classSearchCtrl', function($scope,$state) {
    $scope.content={
      good_name:'',
      un_num:'',
      classification:''
    }
    $scope.search_good = function () {
     if($scope.content.good_name==''&&$scope.content.un_num==''&&$scope.content.classification==''){
       alert('搜索条件不能全为空');
     }else{
       $state.go('searchResult',{searchGood:$scope.content.good_name,searchUN:$scope.content.un_num,dangerGoodClass:$scope.content.classification})
     }
    }
  })
  //危险货物数据库分类搜索结果页面
  .controller('classSearchResultCtrl', function($scope,$stateParams,$cordovaFile,$state) {
      $scope.result=[];
     // var reg_name = new RegExp($stateParams.searchGood); //关于名字的模糊匹配
    $cordovaFile.readAsText(cordova.file.externalDataDirectory, "DBInfo.json")
      .then(function (data_read) {
        var data = angular.fromJson(data_read);//将读取的文件转成json格式
        /*使用JsonSql插件进行对json文件的查询操作，后续需要修改，可将之前进行的循环查询代码全部替换为使用插件查询以提高速度*/
        // $scope.result_init = jsonsql.query("select * from json.DBInfo where (ChineseName=='"+$stateParams.searchGood+"' || Unnum=='"+$stateParams.searchUN+"' || classification=='"+$stateParams.dangerGoodClass+"')",data)
        $scope.name_result=[];
        $scope.un_result=[];
        $scope.class_result=[];
        var condition_num = 0; //不为空的条件数
        //当种类不为空
        if($stateParams.dangerGoodClass!=""){
          $scope.class_result  = jsonsql.query("select * from json.DBInfo where ( classification=='"+$stateParams.dangerGoodClass+"')",data)
          condition_num++;
        }

        //当编号不为空
        if($stateParams.searchUN!=""){
          var reg = new RegExp($stateParams.searchUN);
          for(var i=0;i<data.DBInfo.length;i++){
            if(data.DBInfo[i].Unnum.match(reg))
              $scope.un_result.push(data.DBInfo[i]);
          }
          condition_num++;
        }
        //当名称不为空
        if($stateParams.searchGood!=""){
          var reg = new RegExp($stateParams.searchGood);
          for(var i=0;i<data.DBInfo.length;i++){
            if(data.DBInfo[i].ChineseName.match(reg))
              $scope.name_result.push(data.DBInfo[i]);
          }
          condition_num++;
        }
        $scope.arr = [];
        $scope.result = $scope.name_result.concat($scope.class_result.concat($scope.un_result));
        $scope.result.sort(function(a,b){
          return a.Number - b.Number;//按number关键字排序
        });

        for (var i = 0; i < $scope.result.length;) {
          var count = 0;
          for (var j = i; j < $scope.result.length; j++) {
            if ($scope.result[i].Number === $scope.result[j].Number) {
              count++;
            }
          }
          $scope.arr.push({
            ChineseName: $scope.result[i].ChineseName,
            classification:$scope.result[i].classification,
            Unnum:$scope.result[i].Unnum,
            count: count
          })
          i+=count;
        }
        $scope.result_list = [];
        for (var k = 0; k <  $scope.arr.length; k++) {
          if(condition_num==1){
            if($scope.arr[k].count==1)
              $scope.result_list.push($scope.arr[k]);
          }else if(condition_num==2){
            if($scope.arr[k].count==2)
              $scope.result_list.push($scope.arr[k]);
          }else if(condition_num==3){
            if($scope.arr[k].count==3)
              $scope.result_list.push($scope.arr[k]);
          }
        }
        $scope.searchNote="----------找不到相应货物-----------";
      }, function (error) {
        // error
      });
    $scope.goToPropertyDetail = function (goodName,good_type) {
      $state.go('dangerousgoodsdetails',{goodName:goodName,goodType:good_type});//跳转到二级页面，传递参数goodName
    }
  })
//危险货物数据库模糊搜索页面控制器
  .controller('searchResultCtrl', function($scope,$state,$stateParams,$cordovaFile) {

    $scope.searchResult=[];
    $cordovaFile.readAsText(cordova.file.externalDataDirectory, "DBInfo.json")
      .then(function (data_read) {
        var data = angular.fromJson(data_read);//将读取的文件转成json格式
        var reg = new RegExp($stateParams.dangerSearchWord);
        for(var i=0;i<data.DBInfo.length;i++){
          if(data.DBInfo[i].ChineseName.match(reg)||data.DBInfo[i].basicInfo.EnglishName.match(reg))
            $scope.searchResult.push(data.DBInfo[i].ChineseName);
        }
        $scope.searchNote="----------找不到相应货物-----------";
      }, function (error) {
        // error
      });
    $scope.goToDetail = function (goodName) {
      $state.go('dangerousgoodsdetails',{goodName:goodName});//跳转到二级页面，传递参数goodName
    }
  })
