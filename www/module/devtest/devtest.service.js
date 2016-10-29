angular.module('devtest.service', [])
    .factory('Mocking_Users', function (HttpPromiseService, REGISTER_URL) {
        return {
            init: function () {
                // 模拟数据插入数据库
                var data = [
                    { _id: 17, username: 'ydkf', nickname: "亿达别苑客服", headimg: null },
                    { _id: 18, username: 'ydgczg', nickname: "亿达别苑工程主管", headimg: null },
                    { _id: 384, username: 'py', nickname: "彭奕", headimg: "15602452846-201609051736.png" },
                    { _id: 386, username: 'lxq', nickname: "刘新琼", headimg: null },
                    { _id: 388, username: 'yxy', nickname: "袁晓勇", headimg: "13760425110-201609191259.png" },
                    { _id: 412, username: 'heyc', nickname: "何总", headimg: "15602452846-201609051736.png" },
                    { _id: 414, username: 'wanhuali', nickname: "万华利", headimg: null },
                    { _id: 415, username: 'lijm', nickname: "李建民", headimg: "lijm-201609220947.png" },
                    { _id: 417, username: 'xiaorj', nickname: "肖荣界", headimg: null },
                    { _id: 419, username: 'liws', nickname: "李文帅", headimg: null },
                    { _id: 420, username: 'chengh', nickname: "陈国辉", headimg: null },
                    { _id: 421, username: 'yeyj', nickname: "叶昱君", headimg: null },
                    { _id: 422, username: 'guozc', nickname: "郭仲春", headimg: null },
                    { _id: 423, username: 'lib', nickname: "李斌", headimg: null },
                    { _id: 424, username: 'zhouw', nickname: "周文", headimg: "zhouw-201609202117.png" },
                    { _id: 425, username: 'tiankq', nickname: "田克清", headimg: null },
                    { _id: 426, username: 'daibl', nickname: "戴白露", headimg: null },
                    { _id: 427, username: 'haungjy', nickname: "黄金云", headimg: null },
                    { _id: 428, username: 'gaomx', nickname: "高明霞", headimg: null },
                    { _id: 431, username: 'zhongsy', nickname: "钟盛樱", headimg: null },
                    { _id: 432, username: 'zhul', nickname: "朱雷", headimg: null },
                    { _id: 433, username: 'dl', nickname: "戴露", headimg: "dl-201609191259.png" },
                    { _id: 434, username: 'hj', nickname: "黄健", headimg: "hj-201609202146.png" },
                    { _id: 435, username: 'zf', nickname: "周枫", headimg: "zf-201609202116.png" },
                    { _id: 437, username: 'sxh', nickname: "宋细辉", headimg: "sxh-201609191313.png" },
                    { _id: 441, username: 'ld', nickname: "卢蝶", headimg: "ld-201609201557.png" },
                    { _id: 442, username: 'lp', nickname: "李萍", headimg: "lp-201609200945.png" }
                ];
                for (var i = 0; i < data.length; i++) {
                    var params = {
                        username: data[i].username,
                        nickname: data[i].nickname,
                        headimg: data[i].headimg,
                        password: '123'
                    };
                    HttpPromiseService.getData(REGISTER_URL, params).then(function (data) {
                        console.log(data);
                    });
                }
            }
        };
    })
    .factory('Mocking_Friends', function (HttpPromiseService, LOAD_ALL_USER_URL, ADD_FRIEND_URL) {
        // 模拟数据插入好友列表
        return {
            init: function () {
                HttpPromiseService.getData(LOAD_ALL_USER_URL, {}).then(function (data) {
                    var _ids = '';
                    // 拼凑ID字符串，以";"分隔
                    for (var i = 0; i < data.length; i++) {
                        _ids += data[i]._id;
                        _ids += ";"
                    }
                    var params = {
                        username: 'py',
                        _ids: _ids,
                    };
                    HttpPromiseService.getData(ADD_FRIEND_URL, params).then(function (data) {
                        console.log(data);
                    });
                    console.log(data);
                });
            }
        }
    })

    .factory('loadAllFriend', function (HttpPromiseService, LOAD_FRIENDS_URL) {
        // 测试加载好友数据接口
        return {
            init: function () {
                var params = {
                    username: 'py',
                };
                HttpPromiseService.getData(LOAD_FRIENDS_URL, params).then(function (data) {
                    debugger;
                    console.log(data);
                });
            }
        }
    })