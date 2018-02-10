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
        {url:"http://captliu.win/DBInfo.json",directory:cordova.file.externalDataDirectory+ "DBInfo.json"},
        {url:"http://captliu.win/cargoship.json",directory:cordova.file.externalDataDirectory + "cargoship.json"},
        {url:"http://captliu.win/emergency.json",directory:cordova.file.externalDataDirectory + "emergency.json"},
        {url:"http://captliu.win/LoginInfo.json",directory:cordova.file.externalDataDirectory + "LoginInfo.json"}
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
        //如何实施检测网络
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

    }

  })

  /*修改密码的功能目前暂不能实现*/

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
/*.directive('scrollHeight',function($window){
  return{
    restrict:'AE',
    link:function(scope,element,attr){
      element[0].style.height=($window.innerHeight-44-49-200)+'px';
    }
  }
})*/
