/**
 * 全局常量
 * http://115.29.51.196:5000
 */
angular.module('ionchat.config', [])
    // 请求基地址
    .constant('RequestUrl', 'http://120.24.54.92:9102/')
    // 融云appkey
    .constant('RONGYUN_APPKEY', 'lmxuhwagxgt9d')
    // 基地址
    .constant('BASE_URL', 'http://localhost:54321/')
    // 视频聊天基地址
    .constant('VEDIO_CHAT_URL', 'http://localhost:54321/vediochat')
    // 热更新地址
    .constant('HOT_UPDATE_URL', 'http://115.29.51.196:4321/www/')
     // 登录
    .constant('LOGIN_URL', 'http://localhost:54321/login')
     // 注册
    .constant('REGISTER_URL', 'http://localhost:54321/register')
    // 加载好友列表
    .constant('LOAD_FRIENDS_URL', 'http://localhost:54321/loadfriends')
    // 加载群组列表
    .constant('LOAD_GROUPS_URL', 'http://localhost:54321/loadgroups')
    // 加载添加好友请求
    .constant('LOAD_FRIEND_REQUEST_URL', 'http://localhost:54321/loadfriendrequest')
    // 加载入群好友请求
    .constant('LOAD_GROUP_REQUEST_URL', 'http://localhost:54321/loadgrouprequesst')
    // 添加好友
    .constant('ADD_FRIEND_URL', 'http://localhost:54321/addfriend')
    // 回复好友请求
    .constant('RES_FRIEND_REQUEST', 'http://localhost:54321/res_addfriend')
    // 删除好友
    .constant('REMOVE_FRIEND_URL', 'http://localhost:54321/removefriend')
    // 添加群成员
    .constant('ADD_GROUP_MEMBER_URL', 'http://localhost:54321/addgroupmember')
    // 回复加群
    .constant('RES_GROUP_REQUEST', 'http://localhost:54321/res_addgroupmember')
    // 退群
    .constant('REMOVE_GROUP_URL', 'http://localhost:54321/removegroup')
    
    // =========测试用=============
    .constant('LOAD_ALL_USER_URL', 'http://localhost:54321/loadallusers');

