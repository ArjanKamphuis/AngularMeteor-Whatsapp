angular.module('Whatsapp')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'client/templates/tabs.html'
            })
            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: 'client/templates/chats.html',
                        controller: 'ChatsCtrl as chats'
                    }
                }
            }).state('tab.chat', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'client/templates/chat-detail.html',
                        controller: 'ChatDetailCtrl as chat'
                    }
                }
            });
        $urlRouterProvider.otherwise('tab/chats');
    });