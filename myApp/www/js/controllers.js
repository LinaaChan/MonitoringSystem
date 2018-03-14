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

  .controller('loginPageCtrl', function($scope,$state,$http,$q,$rootScope,locals,$cordovaFileTransfer,$cordovaFile,$timeout,Application,$cordovaNetwork,$ionicLoading,$ionicPopup,$ionicModal) {

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
            template: '正在初始化文件信息...<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
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
                          alert("下载出现错误！");
                          console.log(err);
                        }, function (progress) {
                          $timeout(function () {
                            $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                          });

                        });
                    }, function (err) {
                      alert("下载出现错误！");
                      console.log(err);
                    }, function (progress) {
                    });
                }, function (err) {
                  alert("下载出现错误！");
                  console.log(err);
                }, function (progress) {
                });
            }, function (err) {
              alert("下载出现错误！");
              console.log(err);
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
    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.doRefersh = function () {
      var networkState = $cordovaNetwork.getNetwork();
      if (networkState == "wifi" || networkState == "4g") {
        $http({
          method: 'GET',
          url: 'http://47.96.21.222/data/verCheck.json',
        }).then(function successCallback(success) {
          var data = success.data;
          $cordovaFile.readAsText(cordova.file.externalDataDirectory, data.verCheck[0].name+".json").then(function (local_data0) {
            var local_json0 = angular.fromJson(local_data0);//将读取的文件转成json格式
            $scope.updateInfo = [];
           //第一个文件
            if(local_json0.timestamp<data.verCheck[0].timestamp) {
              $scope.updateInfo.push({'name':data.verCheck[0].name,'isUpdated':true,'url':data.verCheck[0].url,'checked':false,'disabled':false});
            }else{
              $scope.updateInfo.push({'name':data.verCheck[0].name+".json",'isUpdated':false,'url':data.verCheck[2].url,'checked':false,'disabled':false});
            }
            $cordovaFile.readAsText(cordova.file.externalDataDirectory, data.verCheck[1].name+".json").then(function (local_data1) {
              var local_json1 = angular.fromJson(local_data1);//将读取的文件转成json格式
              if(parseInt(local_json1.timestamp)<parseInt(data.verCheck[1].timestamp)) {
                $scope.updateInfo.push({'name':data.verCheck[1].name,'isUpdated':true,'url':data.verCheck[1].url,'checked':false,'disabled':false});
              }else{
                $scope.updateInfo.push({'name':data.verCheck[1].name+".json",'isUpdated':false,'url':data.verCheck[2].url,'checked':false,'disabled':false});
              }
              $cordovaFile.readAsText(cordova.file.externalDataDirectory, data.verCheck[2].name+".json").then(function (local_data2) {
                var local_json2 = angular.fromJson(local_data2);//将读取的文件转成json格式
                if(parseInt(local_json2.timestamp)<parseInt(data.verCheck[2].timestamp)) {
                  $scope.updateInfo.push({'name':data.verCheck[2].name,'isUpdated':true,'url':data.verCheck[2].url,'checked':false,'disabled':false});
                }else{
                  $scope.updateInfo.push({'name':data.verCheck[2].name+".json",'isUpdated':false,'url':data.verCheck[2].url,'checked':false,'disabled':false});
                }
                $cordovaFile.readAsText(cordova.file.externalDataDirectory, data.verCheck[3].name+".json").then(function (local_data3) {
                  var local_json3 = angular.fromJson(local_data3);//将读取的文件转成json格式
                  if(parseInt(local_json3.timestamp)<parseInt(data.verCheck[3].timestamp)) {
                    $scope.updateInfo.push({'name':data.verCheck[3].name,'isUpdated':true,'url':data.verCheck[3].url,'checked':false,'disabled':false});
                  }else{
                    $scope.updateInfo.push({'name':data.verCheck[3].name+".json",'isUpdated':false,'url':data.verCheck[2].url,'checked':false,'disabled':false});
                  }
                  console.log($scope.updateInfo);
                  if($scope.updateInfo[0].isUpdated==false&&$scope.updateInfo[1].isUpdated==false&&$scope.updateInfo[2].isUpdated==false&&$scope.updateInfo[3].isUpdated==false){
                    alert("目前已是最新版本！");
                  } else{
                    $scope.modal.show();
                   // $scope.update();
                  }
                }, function (error) {
                  alert("读取本地文件错误！");
                  console.log(error);
                });
              }, function (error) {
                alert("读取本地文件错误！");
                console.log(error);
              });
            }, function (error) {
              alert("读取本地文件错误！");
              console.log(error);
            });

          }, function (error) {
            alert("读取本地文件错误！");
            console.log(error);
          });

        }, function errorCallback(data) {
          alert("请求失败"+data);
          // 请求失败执行代码
        })
      }else{
        alert("请先连接网络")
      }
    }

    $scope.update = function () {
      var sum=0;
      for(var i=0;i<4;i++) {
        if ($scope.updateInfo[i].checked == true) {
          sum += 100;  //总进度
        }
      }
      console.log(sum);
      $scope.downloadProgress0=0;
      $scope.downloadProgress1=0;
      $scope.downloadProgress2=0;
      $scope.downloadProgress3=0;
        if ($scope.updateInfo[0].checked == false && $scope.updateInfo[1].checked == false && $scope.updateInfo[2].checked == false && $scope.updateInfo[3].checked == false) {
          alert("请选择需要更新的文件");
        }
        console.log($scope.updateInfo);
        if ($scope.updateInfo[0].checked == true) {
          /// var loader0 = window.navigator.dialogsPlus.progressStart("正在更新"+$scope.updateInfo[0].name,"下载中...");
          $cordovaFileTransfer.download($scope.updateInfo[0].url, cordova.file.externalDataDirectory + $scope.updateInfo[0].name + "_temp.json", {}, true)
            .then(function (success_download) {
              $cordovaFile.copyFile(cordova.file.externalDataDirectory, $scope.updateInfo[0].name + "_temp.json", cordova.file.externalDataDirectory, $scope.updateInfo[0].name + ".json")
                .then(function (success) {
                  $cordovaFile.removeFile(cordova.file.externalDataDirectory, $scope.updateInfo[0].name + "_temp.json")
                    .then(function (success) {
                      // $timeout(function () {
                      //   loader0.hide(function () {}, function () {});
                      // },3000);
                    }, function (error) {
                      alert("删除临时文件错误！");
                      console.log(err);
                    });
                }, function (error) {
                  alert("覆盖文件错误！");
                  console.log(error);
                });
            }, function (err) {
              alert("下载出现错误！");
            }, function (progress) {
              $timeout(function () {
                $scope.downloadProgress0 = (progress.loaded / progress.total) * 100;
                $scope.updateInfo[0].downloadProgress = (progress.loaded / progress.total) * 100;
                console.log($scope.updateInfo[0].downloadProgress);
              });
            })
        }
        if ($scope.updateInfo[1].checked == true) {
          //  var loader1 = window.navigator.dialogsPlus.progressStart("正在更新"+$scope.updateInfo[1].name,"下载中...");
          $cordovaFileTransfer.download($scope.updateInfo[1].url, cordova.file.externalDataDirectory + $scope.updateInfo[1].name + "_temp.json", {}, true)
            .then(function (success_download) {
              $cordovaFile.copyFile(cordova.file.externalDataDirectory, $scope.updateInfo[1].name + "_temp.json", cordova.file.externalDataDirectory, $scope.updateInfo[1].name + ".json")
                .then(function (success) {
                  $cordovaFile.removeFile(cordova.file.externalDataDirectory, $scope.updateInfo[1].name + "_temp.json")
                    .then(function (success) {
                      /*   $timeout(function () {
                           loader1.hide(function () {}, function () {});
                         },3000);*/
                    }, function (error) {
                      alert("删除临时文件错误！");
                      console.log(err);
                    });
                }, function (error) {
                  alert("覆盖文件错误！");
                  console.log(error);
                });
            }, function (err) {
              alert("下载出现错误！");
            }, function (progress) {
              $timeout(function () {
                $scope.downloadProgress1 = (progress.loaded / progress.total) * 100;
                console.log($scope.downloadProgress);
                $scope.updateInfo[1].downloadProgress = (progress.loaded / progress.total) * 100;
                // loader1.setValue($scope.downloadProgress);
              });
            })
        }

        if ($scope.updateInfo[2].checked == true) {
          //var loader2 = window.navigator.dialogsPlus.progressStart("正在更新"+$scope.updateInfo[2].name,"下载中...");
          $cordovaFileTransfer.download($scope.updateInfo[2].url, cordova.file.externalDataDirectory + $scope.updateInfo[2].name + "_temp.json", {}, true)
            .then(function (success_download) {
              $cordovaFile.copyFile(cordova.file.externalDataDirectory, $scope.updateInfo[2].name + "_temp.json", cordova.file.externalDataDirectory, $scope.updateInfo[2].name + ".json")
                .then(function (success) {
                  $cordovaFile.removeFile(cordova.file.externalDataDirectory, $scope.updateInfo[2].name + "_temp.json")
                    .then(function (success) {
                      /*  $timeout(function () {
                          loader2.hide(function () {}, function () {});
                        },3000);*/
                    }, function (error) {
                      alert("删除临时文件错误！");
                      console.log(err);
                    });
                }, function (error) {
                  alert("覆盖文件错误！");
                  console.log(error);
                });
            }, function (err) {
              alert("下载出现错误！");
            }, function (progress) {
              $timeout(function () {
                $scope.downloadProgress2 = (progress.loaded / progress.total) * 100;
                console.log($scope.downloadProgress);
                $scope.updateInfo[2].downloadProgress = (progress.loaded / progress.total) * 100;
                //  loader2.setValue($scope.downloadProgress);
              });
            })
        }
        if ($scope.updateInfo[3].checked == true) {
          //  var loader3 = window.navigator.dialogsPlus.progressStart("正在更新"+$scope.updateInfo[3].name,"下载中...");
          $cordovaFileTransfer.download($scope.updateInfo[3].url, cordova.file.externalDataDirectory + $scope.updateInfo[3].name + "_temp.json", {}, true)
            .then(function (success_download) {
              $cordovaFile.copyFile(cordova.file.externalDataDirectory, $scope.updateInfo[3].name + "_temp.json", cordova.file.externalDataDirectory, $scope.updateInfo[3].name + ".json")
                .then(function (success) {
                  $cordovaFile.removeFile(cordova.file.externalDataDirectory, $scope.updateInfo[3].name + "_temp.json")
                    .then(function (success) {
                      /*   $timeout(function () {
                           loader3.hide(function () {}, function () {});
                         },3000);*/
                    }, function (error) {
                      alert("删除临时文件错误！");
                      console.log(err);
                    });
                }, function (error) {
                  alert("覆盖文件错误！");
                  console.log(error);
                });
            }, function (err) {
              alert("下载出现错误！");
            }, function (progress) {
              $timeout(function () {
                $scope.downloadProgress3 = (progress.loaded / progress.total) * 100;
                console.log($scope.downloadProgress);
                $scope.updateInfo[3].downloadProgress = (progress.loaded / progress.total) * 100;
                // loader3.setValue($scope.downloadProgress);
              });
            })
        }
        var progressListener = $scope.$watch('downloadProgress0+downloadProgress1+downloadProgress2+downloadProgress3', function () {
          console.log($scope.downloadProgress0);
          console.log($scope.downloadProgress1);
          console.log($scope.downloadProgress2);
          console.log($scope.downloadProgress3);
          console.log(sum);
          if($scope.downloadProgress0+$scope.downloadProgress1+$scope.downloadProgress2+$scope.downloadProgress3==sum){
            alert("已完成文件更新！");
            progressListener();
            $scope.modal.hide();
          }

        });
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

