angular.module('Whatsapp')
    .controller('ChatDetailCtrl', function($scope, $reactive, $stateParams, $timeout, $ionicScrollDelegate, $ionicPopup, $log) {
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
        this.sendPicture = () => {
            MeteorCameraUI.getPicture({}, (err, data) => {
                if (err && err.error === 'cancel') return;
                if (err) return handleError(err);
                Meteor.call('newMessage', {
                    picture: data,
                    type: 'picture',
                    chatId: chatId
                });
            });
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
        
        function handleError(err) {
            $log.error('send picture error', err);
            $ionicPopup.alert({
                title: err.reason || 'Send failed',
                template: 'Please try again',
                okType: 'button-positive button-clear'
            });
        }
    });