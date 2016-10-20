angular.module('chat.directive')
    .directive('messageList', function ($ionicPopup) {
        return {
            restrict: "E",
            templateUrl: 'module/chat/directives/messagelist/messagelist.tpl',
            replace: true,
            scope: {
                friendsMessage: "=friendinviteList",
                gotoChatDetils2: "&responseReq",
                markMessage2: "&markMessage2",
                deleteMessage2: "&deleteMessage2",
            },
            link: function (scope, element, attrs, controller) {
                scope.popup = {
                    isPopup: false,
                    index: 0
                };
                // 弹出框
                scope.popupMessageOpthins = function (message) {
                    scope.popup.index = scope.friendsMessage.indexOf(message);
                    scope.popup.optionsPopup = $ionicPopup.show({
                        templateUrl: "module/chat/directives/messagelist/popup.html",
                        scope: scope,
                    });
                    scope.popup.isPopup = true;
                };
                // 设为已读
                scope.markMessage_local = function () {
                    var index = scope.popup.index;
                    scope.popup.optionsPopup.close();
                    scope.popup.isPopup = false;
                    scope.markMessage2()(index);
                };
                // 删除消息
                scope.deleteMessage_local = function () {
                    var index = scope.popup.index;
                    scope.popup.optionsPopup.close();
                    scope.popup.isPopup = false;
                    scope.deleteMessage2()(index);
                };

                scope.gotoChatDetils_local = function (friend, $index) {
                    scope.gotoChatDetils2()(friend, $index);
                }
            }
        };
    });
