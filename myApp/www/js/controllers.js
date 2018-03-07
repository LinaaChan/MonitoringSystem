angular.module('starter.controllers', [])
/*通用控制器*/
  .controller('homepageCtrl', function($scope,$state,$rootScope,logoutService) {
    $scope.gotoCargo = function (params) {
     $state.go('oilshipcheck');
    }
    $scope.gotoDangerousGoods = function (params) {
     $state.go('dangerousgoods');
    }
    //弹出确认框
    $scope.showConfirm_logout = function(){
      logoutService.logout();
    }
  })

  .controller('loginPageCtrl', function($scope,$state,$http,$q,$rootScope,locals,$cordovaFileTransfer,$cordovaFile,$timeout,Application,$cordovaNetwork,$ionicLoading) {


    var downloadFirstVersion = function () {
      //如果应用首次打开
      var downloading = [
        {url:"http://47.96.21.222/data/DBInfo.json",directory:cordova.file.externalDataDirectory+ "DBInfo.json"},
        {url:"http://47.96.21.222/data/cargoship.json",directory:cordova.file.externalDataDirectory + "cargoship.json"},
        {url:"http://47.96.21.222/data/emergency.json",directory:cordova.file.externalDataDirectory + "emergency.json"},
        {url:"http://47.96.21.222/data/LoginInfo.json",directory:cordova.file.externalDataDirectory + "LoginInfo.json"}
      ]
      if (Application.isInitialRun()) {
        if ($scope.networkState == "wifi" || $scope.networkState == "4g") {
          //有网络的情况下下载初始版本（下载完初始版本才将标志置为false）
          $ionicLoading.show({
            template: '正在初始化文件信息...<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'//<progress ng-hide="download.progress==1;" max="1" value="{{download.progress}}"></progress>
          });
          $cordovaFileTransfer.download(downloading[0].url ,downloading[0].directory, {}, true)
            .then(function (result) {
              $cordovaFileTransfer.download(downloading[1].url ,downloading[1].directory, {}, true)
                .then(function (result) {
                  $cordovaFileTransfer.download(downloading[2].url ,downloading[2].directory, {}, true)
                    .then(function (result) {
                      $cordovaFileTransfer.download(downloading[3].url ,downloading[3].directory, {}, true)
                        .then(function (result) {
                          Application.setInitialRun(false);
                          $ionicLoading.hide();
                        }, function (err) {
                          // Error
                        }, function (progress) {
                        });
                    }, function (err) {
                      // Error
                    }, function (progress) {
                    });
                }, function (err) {
                  // Error
                }, function (progress) {
                });
            }, function (err) {
              // Error
            }, function (progress) {
            });

        } else {
          //弹出警示窗，不连接网络不能使用
          $ionicLoading.show({
            template: '首次使用请先连接网络完成初始化！'
          });

          $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
            $scope.networkState = networkState;
            console.log($scope.networkState);
            downloadFirstVersion();
          })
        }
      }
    }
    document.addEventListener("deviceready", onDeviceReady, false);
    //等待设备加载完成

    function onDeviceReady() {
      $scope.networkState = $cordovaNetwork.getNetwork();
      downloadFirstVersion();
    }

    if(locals.get("isPassword")=="false"){
      var bool_pwd = false;
    }else{
      var bool_pwd = true;
    }
    if(locals.get("account")==""||locals.get("account")==undefined){
      $scope.loginData = {
        account:"",
        password:"",
        checked: bool_pwd
      }
    }else {
      $scope.loginData = {
        account:locals.get("account"),
        password:locals.get("password"),
        checked: bool_pwd
      }
    }


    $scope.doLogin = function () {
    console.log($scope.loginData.checked);
    if($scope.loginData.account==""||$scope.loginData.password=="")
        alert("账号和密码都不能为空！");
      else{
      $cordovaFile.readAsText(cordova.file.externalDataDirectory, "LoginInfo.json")
        .then(function (data_read) {
          var data = angular.fromJson(data_read);//将读取的文件转成json格式
          $scope.result = jsonsql.query("select * from json.members where (account=='"+$scope.loginData.account+"')",data);
          if($scope.result==null||$scope.result==''){
            alert("用户不存在！");
            //密码正确
          }else if($scope.result[0].password==$scope.loginData.password){
            //设置全局变量
            $rootScope.username = $scope.result[0].user;
            //设置缓存
            locals.set("username",$scope.result[0].user);
            locals.set("account",$scope.result[0].account);
            locals.set("password",$scope.result[0].password);
            locals.set("isPassword",$scope.loginData.checked);
            $state.go('homepage');
          }else{
            alert("密码错误！");
          }
        }, function (error) {
          // error
        });
      }
    }
    $scope.doRefersh = function () {
      var networkState = $cordovaNetwork.getNetwork();
      if (networkState == "wifi" || networkState == "4g") {
        $http({
          method: 'GET',
          url: 'http://47.96.21.222/api/export/ver',
          headers: {
            'Content-Type': 'application/octet-stream',
          }
        }).then(function successCallback(response) {
          // 请求成功执行代码
          var data = response.data;
          $ionicLoading.show({
            template: '正在更新文件信息...'
          });
          console.log(data);
          $cordovaFile.readAsText(cordova.file.externalDataDirectory, data.verCheck[0].name+".json").then(function (local_data0) {
            console.log(data.verCheck[0].name+".json");
            var local_json0 = angular.fromJson(local_data0);//将读取的文件转成json格式
            console.log(local_json0);
            if(parseInt(local_json0.timestamp)<parseInt(data.verCheck[0].timestamp)){
              console.log(local_json0.timestamp);
              console.log(data.verCheck[0].timestamp);
              $cordovaFileTransfer.download(data.verCheck[0].url ,cordova.file.externalDataDirectory+data.verCheck[0].name+".json", {}, true)
                .then(function (success) {
                  console.log("下载最新版本...");
                }, function (err) {
                  alert("下载出现错误！");
                }, function (progress) {});
            }
          });
          $cordovaFile.readAsText(cordova.file.externalDataDirectory, data.verCheck[1].name+".json").then(function (local_data1) {
            console.log(data.verCheck[1].name+".json");
            var local_json1 = angular.fromJson(local_data1);//将读取的文件转成json格式
            console.log(local_json1);
            if(parseInt(local_json1.timestamp)<parseInt(data.verCheck[1].timestamp)){
              console.log(local_json1.timestamp);
              console.log(data.verCheck[1].timestamp);
              $cordovaFileTransfer.download(data.verCheck[1].url ,cordova.file.externalDataDirectory+data.verCheck[1].name+".json", {}, true)
                .then(function (success) {
                  console.log("下载最新版本...");
                }, function (err) {
                  alert("下载出现错误！");
                }, function (progress) {});
            }
          });
          $cordovaFile.readAsText(cordova.file.externalDataDirectory, data.verCheck[2].name+".json").then(function (local_data2) {
            console.log(data.verCheck[2].name+".json");
            var local_json2 = angular.fromJson(local_data2);//将读取的文件转成json格式
            console.log(local_json2);
            if(parseInt(local_json2.timestamp)<parseInt(data.verCheck[2].timestamp)){
              console.log(local_json2.timestamp);
              console.log(data.verCheck[2].timestamp);
              $cordovaFileTransfer.download(data.verCheck[2].url ,cordova.file.externalDataDirectory+data.verCheck[2].name+".json", {}, true)
                .then(function (success) {
                  console.log("下载最新版本...");
                }, function (err) {
                  alert("下载出现错误！");
                }, function (progress) {});
            }
          });
          $cordovaFile.readAsText(cordova.file.externalDataDirectory, data.verCheck[3].name+".json").then(function (local_data3) {
            console.log(data.verCheck[3].name+".json");
            var local_json3 = angular.fromJson(local_data3);//将读取的文件转成json格式
            console.log(local_json3);
            if(parseInt(local_json3.timestamp)<parseInt(data.verCheck[3].timestamp)){
              console.log(local_json3.timestamp);
              console.log(data.verCheck[3].timestamp);
              $cordovaFileTransfer.download(data.verCheck[3].url ,cordova.file.externalDataDirectory+data.verCheck[3].name+".json", {}, true)
                .then(function (success) {
                  console.log("下载最新版本...");
                }, function (err) {
                  alert("下载出现错误！");
                }, function (progress) {});
            }
          });

        }, function errorCallback(data) {
          console.log(data);
          // 请求失败执行代码
        }).then(function () {
          $ionicLoading.hide();
        });
      }else{
        alert("请先连接网络")
      }
    }
  })


  //ng-repeat去除重复
  .filter('unique', function () {
    return function (collection, keyname) {
      var output = [],
        keys = [];
      angular.forEach(collection, function (item) {
        var key = item[keyname];
        if (keys.indexOf(key) === -1) {
          keys.push(key);
          output.push(item);
        }
      });
      return output;
    };
  })

