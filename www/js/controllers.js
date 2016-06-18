angular.module('starter.controllers')
    .controller('LoginCtrl', function ($timeout, $scope, HttpFactory, $state, $ionicPopup,
                                       myNote, CacheFactory, $rootScope, signaling, RequestUrl, _appKey,currentUser) {
        $scope.user = {};
        $scope.loginIn = function (valid) {
            if (valid) {
                $scope.user.VerificationCode = {};
                $scope.user.UseVerificationCode = false;
                HttpFactory.send({
                    url: RequestUrl + 'Action.ashx?Name=HYD.E3.Business.UserInfo_newBLL.SignUp',
                    data: {
                        name: $scope.user.name,
                        pwd: $scope.user.pwd
                    },
                    method: 'post'
                }).success(function (data) {
                    // console.log(data);
                    if (data.data.length == 0) {
                        myNote.myNotice("用户名或密码错误!");
                    } else {
                        var uuid = ionic.Platform.device().uuid;
                        if (data.data[0].IsBindPhone == '1') {
                            if (data.data[0].PhoneCode == null) {
                                //写入uuid；
                                setPhoneCode(data.data[0].UserID, uuid);
                            } else if (data.data[0].PhoneCode != uuid) {
                                myNote.myNotice('该账号不能在这个手机上登录！');
                                return;
                            }
                        }
                        //存储登录信息
                        CacheFactory.save('Login', true);
                        currentUser.setUserinfo(data.data[0]);
                        CacheFactory.save('UserAccount', data.data[0]);
                        $state.go('EFOS.person');
                    }
                });
            } else {
                if ($scope.user.name == undefined && $scope.user.pwd == undefined) {
                    myNote.myNotice("用户名和密码不能为空!");
                }
                else if ($scope.user.name == undefined) {
                    myNote.myNotice("用户名不能为空!");
                }
                else if ($scope.user.pwd == undefined) {
                    myNote.myNotice("密码不能为空!");
                }
            }
        };

        function setPhoneCode(userId, uuid) {
            HttpFactory.send({
                url: RequestUrl + 'Action.ashx?Name=HYD.E3.Business.APP_CommonBLL.UpdateBindPhoneInfo',
                data: {
                    UserID: userId,
                    PhoneCode: uuid
                },
                method: 'post'
            }).success(function (data) {
                //手机绑定成功
            })
        }
    })

    .controller('RegisterCtrl', function (CacheFactory, $scope, $state, myNote, HttpFactory, RequestUrl, $timeout, $interval) {
        $scope.$on('$ionicView.beforeEnter', function () {
            if (!!CacheFactory.get('Login')) {
                $state.go('EFOS.person');

            } else if (!!CacheFactory.get('token')) {
                $state.go('login');
            }
        });

        $scope.user = {state: true};
        $scope.canClick = false;
        $scope.buttonTitle = '获取验证码';

        $scope.SendMsgCode = function (mobPhone) {
            if ($scope.user.phone == null) {
                myNote.myNotice('手机号码不能为空', 2000);
                return;
            }
            if (!/^1\d{10}$/.test(mobPhone)) {
                myNote.myNotice('手机号码格式不正确');
                return;
            }

            $scope.canClick = true;
            $scope.buttonTitle =60;

            var itr=$interval(function () {
                if ($scope.buttonTitle == 0) {
                    $scope.buttonTitle = '获取验证码';
                    $interval.cancel(itr);
                    $scope.canClick = false;
                } else {
                    $scope.buttonTitle -= 1;
                }
            }, 1000);

            AV.Cloud.requestSmsCode(mobPhone).then(function () {
                //发送成功
                console.log('success');

            }, function (err) {
                //发送失败
                myNote.myNotice(err.message);
            });
        };

        $scope.toProtocol = function () {
        };

        $scope.register = function () {
            if ($scope.user.phone == null) {
                myNote.myNotice('手机号不能为空!', 1000);
                return;
            } else if ($scope.user.smsCode == null) {
                myNote.myNotice('验证码不能为空!', 1000);
                return;
            } else if ($scope.user.state == false) {
                myNote.myNotice('请先同意协议！', 1000);
                return;
            } else if ($scope.user.pwd == null) {
                myNote.myNotice('密码不能为空！', 1000);
                return;
            }

            var reg1 = /^1[3|4|5|7|8][0-9]{9}$/;
            var reg2 = /\d/;
            var reg3 = /[a-z]/;
            var reg4 = /[a-z0-9]{6,12}/;
            var phone = $scope.user.phone;
            var pwd = $scope.user.pwd.toLowerCase();

            if (!reg1.test(phone)) {
                myNote.myNotice('手机号格式不对！')
            } else if (!(reg2.test(pwd) && reg3.test(pwd) && reg4.test(pwd))) {
                myNote.myNotice('密码格式不对！')
            } else {
                var user = new AV.User();
                user.signUpOrlogInWithMobilePhone({
                    mobilePhoneNumber: $scope.user.phone,
                    smsCode: $scope.user.smsCode
                }).then(function (user) {
                    //注册或者登录成功
                    personData(phone, pwd);
                    //console.log(user);
                }, function (error) {
                    // 失败
                    myNote.myNotice(error.message);
                });
            }

            function personData(phone, pwd) {
                HttpFactory.send({
                    url: RequestUrl + 'Action.ashx?Name=HYD.E3.Business.UserInfo_newBLL.SignIn',
                    data: {
                        model: angular.toJson({
                            Mobile: phone,
                            Password: pwd,
                            SunPoint: 50
                        })
                    },
                    method: 'post'
                }).success(function (data) {
                    CacheFactory.save('token', true);

                    if(data.data.length==0){
                        myNote.myNotice('该号码已注册，请直接登录！',1500);
                        $state.go('login');
                    }else{
                        CacheFactory.save('Login', true);
                        CacheFactory.save('UserAccount',  data.data[0]);
                        $state.go('EFOS.person');
                    }

                })
            }
        };

    })

    .controller('EFosCtrl', function ($ionicModal, $state, myNote, $rootScope, $scope, CacheFactory,
                                      HttpFactory, RequestUrl, $ionicLoading, newMessageEventService,currentUser) {

        var cache= angular.fromJson(CacheFactory.get('UserAccount'));


        $rootScope.TabState = cache.flag == 1;


        if (!!$rootScope.TabState) {
            HttpFactory.send({
                url: RequestUrl + 'Action.ashx?Name=HYD.E3.Business.UserInfo_newBLL.GetProjectInfo',
                data: {
                    UserID: cache.UserID
                },
                method: 'post'
            }).success(function (data) {
                if (data.data.length == 0) {
                    return;
                }
                $scope.ProjectInfo = data.data;
                currentUser.setProjectinfo(data.data);
                if (cache.PCode == null) {
                    cache.PCode=data.data[0].PCode;
                    CacheFactory.save('UserAccount',cache);
                    currentUser.setUserinfo(cache);
                    $scope.CurrentPName = data.data[0].PName;
                } else {
                    for (var p = 0, len = data.data.length; p < len; p++) {
                        if (data.data[p].PCode == cache.PCode ) {
                            $scope.CurrentPName = data.data[p].PName;
                        }
                    }
                }
            });
        }

        //切换项目
        $scope.ChangeProject = function (PCode, PName) {
            //判断PCode 是否有变化
            if (cache.PCode == PCode) {
                return;
            }
            cache.PCode=PCode;
            CacheFactory.save('UserAccount',cache);
            $scope.CurrentPName = PName;
            $rootScope.$broadcast('change Project', PCode);
            $ionicLoading.show({
                template: '<ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner>'
            });
            $state.go('EFOS.index');
        };


        /// ==== 协同相关, 全局监听消息(BEGIN) ====
        var chMsg = function (newValue, oldValue) {
            // alert('mainpage:来消息了！newValue:'+newValue +":oldValue:" + oldValue);
            if (newValue !== oldValue) {
                var jsonMsg = newValue.pop();
                if (typeof jsonMsg !== "undefined" && jsonMsg !== "undefined") {
                    newMessageEventService.broadcast(jsonMsg);
                }
            }
        };
        // watch items的变化
        var listener = $rootScope.$watch('arrMsgs', chMsg, true);

        $scope.$on('$destroy', function () {
            console.log('destroy');
            listener();
        });
        /// ==== 协同相关, 全局监听消息(END) ====

    });