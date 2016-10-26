angular.module('chat.directive')
    .directive('phoneContact', function ($state, $ionicLoading,
        $ionicScrollDelegate, $timeout) {
        return {
            restrict: "E",
            templateUrl: 'module/chat/directives/phonecontact/phonecontact.tpl',
            replace: true,
            transclude : true,
            scope: {
                friendsList_local: "=friendsList",
                groupsList_local: "=groupsList",
            },
            link: function (scope, element, attrs, controller) {
                scope.initTalk = function (friendID, username, type, $event) {
                    $state.go('tab.chatDetail', {
                        messageId: '1', name: username, targetId: friendID,
                        conversationType: type
                    });
                    $event.stopPropagation();
                    $event.preventDefault();
                }
                /**
                 * 待重构
                 */
                // 联系人右边导航栏
                scope.cri = { DataValue: '' };

                scope.gotoList = function (letter) {
                    var showBox = $ionicLoading.show({ template: letter });
                    $timeout(function () {
                        $ionicLoading.hide();
                    }, 550);
                    if (letter == '↑')
                        letter = "top";
                    // 导航至对应字幕开头的[这里改做一个操作，匹配最近的！]
                    var index_alpha = document.querySelector("a[name=index_" + letter + "]");
                    index_alpha = angular.element(index_alpha);
                    var scrollTop = index_alpha.attr("scrollTop");
                    if (scrollTop) {
                        $ionicScrollDelegate.scrollTo(0, scrollTop, true);
                    }
                }
            }
        };
    });
