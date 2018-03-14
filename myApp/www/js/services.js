angular.module('starter.services', ['ngCordova'])
  .factory('locals',['$window',function($window) {
    return {
      //存储单个属性
      set: function (key, value) {
        $window.localStorage[key] = value;
      },
      //读取单个属性
      get: function (key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      //存储对象，以JSON格式存储
      setObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      //读取对象
      getObject: function (key) {
        return JSON.parse($window.localStorage[key] || '{}');
      }
    }
  }
])
  .factory('logoutService',['$ionicPopup','locals','$state',function($ionicPopup,locals,$state) {
    return{
      logout:function () {
        var confirmPopup = $ionicPopup.confirm({
          title: '退出登陆？',
          template: '是否确认退出此账号，登陆信息将被清空?',
          okText: '确定',
          cancelText: '取消'
        });
        confirmPopup.then(function(res) {
          if(res) {
            // locals.set("username","");
           // locals.set("account","");
            if(locals.get("isPassword")==false||locals.get("isPassword")=="false"){
              locals.set("password","");
              locals.set("isPassword",false);
            }
            $state.go('loginPage',{},{reload:true});
          } else {}
        });
      },
      login:function () {

      }

    }
  }
  ])
  //首次安装
  .factory('Application', ['$window',function ($window) {
    return {
      setInitialRun : function (initial) {
        $window.localStorage["initialRun"] = (initial ? "true" : "false");
      },
      isInitialRun : function () {
        var value = $window.localStorage["initialRun"] || "true";
        return value == "true";
      }
    };
  }])
  .factory('VersionCheck', ['$cordovaNetwork','$http','$cordovaFile','$cordovaFileTransfer','$timeout',function ($cordovaNetwork,$http,$timeout,$cordovaFile,$cordovaFileTransfer,$timeout) {
    return {
      //版本更新
      doVersionUpdate:function () {
      /*  var networkState = $cordovaNetwork.getNetwork();
        if(networkState=="wifi"||networkState=="4g"){
          //连接接口，判断当前版本是否为最新，如有，则弹出窗口提示更新
          $http.get("").success(function(data,status,headers,config){

            for(var i=0;i<data.dbInfo.length;i++){

              if(parseInt(data.dbInfo[i].timestamp)>"本地文件的版本号")
              {//覆盖本地文件
                var url = data.dbInfo[i].url;
                var targetPath = cordova.file.documentsDirectory + data.dbInfo[i].name+".json";
                var trustHosts = true;
                var options = {};
                $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                  .then(function(result) {
                    // Success!
                  }, function(err) {
                    // Error
                  }, function (progress) {
                    $timeout(function () {
                      $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                    });
                  });
              }
            }
          }).error(function(data,status,headers,config){
            //连接失败
            alert("网络连接错误！");
          })
        }*/
      },
      //检查版本是否有更新
      doVersionCheck:function () {
        document.addEventListener("deviceready", onDeviceReady, false);
        //等待设备加载完成
        function onDeviceReady() {
          $cordovaFile.readAsText(cordova.file.externalDataDirectory, "DBInfo.json")
            .then(function (success) {
              $scope.text = angular.fromJson(success);//将读取的文件转成json格式
              console.log($scope.text);
            }, function (error) {
              // error
            });
          $cordovaFile.readAsText(cordova.file.externalDataDirectory, "emergency.json")
            .then(function (success) {
              $scope.text = angular.fromJson(success);//将读取的文件转成json格式
              console.log($scope.text);
            }, function (error) {
              // error
            });
          $cordovaFile.readAsText(cordova.file.externalDataDirectory, "LoginInfo.json")
            .then(function (success) {
              $scope.text = angular.fromJson(success);//将读取的文件转成json格式
              console.log($scope.text);
            }, function (error) {
              // error
            });
          $cordovaFile.readAsText(cordova.file.externalDataDirectory, "cargoship.json")
            .then(function (success) {
              $scope.text = angular.fromJson(success);//将读取的文件转成json格式
              console.log($scope.text);
            }, function (error) {
              // error
            });
        }
      },
      downloadFirstVersion:function () {
        var downloading = [];
        $cordovaFileTransfer.download("http://captliu.win/DBInfo.json",cordova.file.externalDataDirectory + "DBInfo.json", {}, true)
          .then(function (result) {
            // Success!
            alert("success!!1");
            console.log(result);
          }, function (err) {
            // Error
          }, function (progress) {
            $timeout(function () {
              $scope.downloadProgress = (progress.loaded / progress.total) * 100;
              console.log("login:");
              console.log($scope.downloadProgress);
            });
          });
      }
    };

  }])
  // .factory('', ['$http',function ($http) {
  //   return {
  //
  //   }
  //
  // }])
