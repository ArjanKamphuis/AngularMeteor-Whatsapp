angular.module('Whatsapp')
    .controller('ChatDetailCtrl', function($scope, $reactive, $stateParams, $timeout, $ionicScrollDelegate) {
        $reactive(this).attach($scope);
        let chatId = $stateParams.chatId;
        let isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
        
        this.sendMessage = () => {
            if (_.isEmpty(this.message)) return;
            Meteor.call('newMessage', {
                text: this.message,
                type: 'text',
                chatId: chatId
            });
            delete this.message;
        };
        this.inputUp = () => {
            if (isIOS) {
                this.keyboardHeight = 216;
            }
            $timeout(function() {
                $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
            }, 300);
        };
        this.inputDown = () => {
            if (isIOS) {
                this.keyboardHeight = 0;
            }
            $timeout(function() {
                $ionicScrollDelegate.$getByHandle('chatScroll').resize();
            }, 300);
        };
        this.closeKeyboard = () => { /* cordova.plugins.keyboard.close(); */ };
        this.helpers({
            messages() {
                return Messages.find({ chatId: chatId });
            },
            data() {
                return Chats.findOne(chatId);
            }
        });
        $scope.$watchCollection('chat.messages', (oldVal, newVal) => {
            let animate = oldVal.length !== newVal.length;
            $timeout(function() {
                $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
            }, 300);
        });
    });