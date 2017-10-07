angular.module('dangerousGoods.controllers', [])
/*危险货物数据库模块控制器*/

/*危险货物数据库控制器，模块一级界面1*/
  .controller('dangerousgoodsDBCtrl', function($scope,$stateParams,$state) {
    $scope.goToPropertyDetail = function (goodName) {
      $state.go('dangerousgoodsdetails',{goodName:goodName});//跳转到二级页面，传递参数goodName
    }
  })
  /*危险货物数据库控制器，模块一级界面2*/
  .controller('allDangerGoodCtrl', function($scope,$http,$q,$state) {
    var defer = $q.defer();
    $http({
      method: 'get',
      url: './templates/DBInfo.json'
    }).success(function (data) {
      defer.resolve(data);
      $scope.data = data.DBInfo;
    }).error(function (data) {
      defer.reject(data);
    })
    $scope.goToDetail = function (goodName) {
      $state.go('dangerousgoodsdetails',{goodName:goodName});
    }
  })
  /*模块二级页面，货物特性和船舶适载要求*/
  .controller('dangerGoodDetailCtrl', function($scope,$stateParams,$http,$q,$state) {
    $scope.goodName = $stateParams.goodName;
    $scope.goToPropertyList = function () {
      $state.go('goodpropertylist',{checkGoodName:$stateParams.goodName});
    }
    $scope.goToCargoList = function () {
      $state.go('cargoshiplist',{checkCargoShip:$stateParams.goodName});
    }
   /* $scope.goToProperty = function (goodName) {
      $state.go('goodproperty',{goodNameForProperty:$stateParams.goodName});
    }
    $scope.goToIBCIGC = function (goodName) {
      $state.go('IBCIGC',{goodNameIBCIGC:$stateParams.goodName});
    }
    $scope.goToOilFence = function (goodName) {
      $state.go('oilFence',{goodNameoilFence:$stateParams.goodName});
    }*/
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
  .controller('goodPropertyBasicInfoCtrl', function($scope,$stateParams,$http,$q) {
    $scope.goodName = $stateParams.goodNameForBasicInfo;
    console.log($stateParams.goodNameForBasicInfo);
    var defer = $q.defer();
    $http({
      method: 'get',
      url: './templates/DBInfo.json'
    }).success(function (data) {
      defer.resolve(data);
      for(var i=0;i<data.DBInfo.length;i++){
        if(data.DBInfo[i].ChineseName==$scope.goodName){
          $scope.detailInfo = data.DBInfo[i].basicInfo;
        }
      }
    }).error(function (data) {
      defer.reject(data);
    })
  })
  /*理化特性页面：熔点（凝固点）℃meltingpoint、沸点℃boilingpoint、闪点℃flashingpoint、爆炸上限 下限%boom、相对密度(水=1)density、溶解性dissolution
*/
  .controller('goodPropertyChemistryCtrl', function($scope,$stateParams,$http,$q) {
    $scope.goodName = $stateParams.goodNameForChemistry;
    var defer = $q.defer();
    $http({
      method: 'get',
      url: './templates/DBInfo.json'
    }).success(function (data) {
      defer.resolve(data);
      for(var i=0;i<data.DBInfo.length;i++){
        if(data.DBInfo[i].ChineseName==$scope.goodName){
          $scope.detailInfo = data.DBInfo[i].property;
        }
      }
    }).error(function (data) {
      defer.reject(data);
    })
  })
  /*作业要求页面：围油栏oilfence、船舶污染清除协议（1万总吨以下）
*/
  .controller('goodPropertyRequirementCtrl', function($scope,$stateParams,$http,$q) {
    $scope.goodName = $stateParams.goodNameForRequirement;
    var defer = $q.defer();
    $http({
      method: 'get',
      url: './templates/DBInfo.json'
    }).success(function (data) {
      defer.resolve(data);
      for(var i=0;i<data.DBInfo.length;i++){
        if(data.DBInfo[i].ChineseName==$scope.goodName){
          $scope.detailInfo = data.DBInfo[i].jobRequirements;
        }
      }
    }).error(function (data) {
      defer.reject(data);
    })
  })
  /*构造要求页面*/
  .controller('infrastructureRequirementCtrl', function($scope,$stateParams,$http,$q) {
    $scope.goodName = $stateParams.goodNameInfrastructure;
    var defer = $q.defer();
    $http({
      method: 'get',
      url: './templates/DBInfo.json'
    }).success(function (data) {
      defer.resolve(data);
      for(var i=0;i<data.DBInfo.length;i++){
        if(data.DBInfo[i].ChineseName==$scope.goodName){
          $scope.detailInfo = data.DBInfo[i];
        }
      }
    }).error(function (data) {
      defer.reject(data);
    })
  })
  /*设备要求页面*/
  .controller('equipmentRequirementCtrl', function($scope,$stateParams,$http,$q) {
    $scope.goodName = $stateParams.goodNameEquipment;
    var defer = $q.defer();
    $http({
      method: 'get',
      url: './templates/DBInfo.json'
    }).success(function (data) {
      defer.resolve(data);
      for(var i=0;i<data.DBInfo.length;i++){
        if(data.DBInfo[i].ChineseName==$scope.goodName){
          $scope.detailInfo = data.DBInfo[i];
        }
      }
    }).error(function (data) {
      defer.reject(data);
    })
  })
  /*特殊要求页面*/
  .controller('specialRequirementCtrl', function($scope,$stateParams,$http,$q) {
    $scope.goodName = $stateParams.goodNameSpecial;
    var defer = $q.defer();
    $http({
      method: 'get',
      url: './templates/DBInfo.json'
    }).success(function (data) {
      defer.resolve(data);
      for(var i=0;i<data.DBInfo.length;i++){
        if(data.DBInfo[i].ChineseName==$scope.goodName){
          $scope.detailInfo = data.DBInfo[i];
        }
      }
    }).error(function (data) {
      defer.reject(data);
    })
  })
/*  .controller('IBCIGCCtrl', function($scope,$stateParams,$http,$q,$state) {
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
  })*/
/*  .controller('oilFenceCtrl', function($scope,$stateParams,$http,$q,$state) {
    $scope.goodName = $stateParams.goodNameoilFence;

  })*/
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
  .controller('searchResultCtrl', function($scope,$stateParams,$http,$q,$state) {
    /*DBInfo.json文件有些地方需要修改，需要将一下的字段放到数组的第一级字段中（为了不影响之前的代码，只能重复添加）*/
    console.log($stateParams.searchGood);//货物名称
    console.log($stateParams.searchUN);//UN编号
 //   console.log($stateParams.dork);//码头泊位(还需要确定对应的是哪一个字段)
    console.log($stateParams.dangerGoodClass);//危险货物类别
      var defer = $q.defer();
      $http({
        method: 'get',
        url: './templates/DBInfo.json'
      }).success(function (data) {
        /*使用JsonSql插件进行对json文件的查询操作，后续需要修改，可将之前进行的循环查询代码全部替换为使用插件查询以提高速度*/
        $scope.result = jsonsql.query("select ChineseName from json.DBInfo where (ChineseName=='"+$stateParams.searchGood+"' || Unnum=='"+$stateParams.searchUN+"' || classification=='"+$stateParams.dangerGoodClass+"') order by ChineseName",data);
      }).error(function (data) {
        defer.reject(data);
      })
    $scope.goToPropertyDetail = function (goodName) {
      $state.go('dangerousgoodsdetails',{goodName:goodName});//跳转到二级页面，传递参数goodName
    }
  })
