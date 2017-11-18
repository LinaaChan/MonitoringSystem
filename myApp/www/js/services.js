angular.module('starter.services', [])
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
