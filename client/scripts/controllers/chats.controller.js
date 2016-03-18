angular.module('Whatsapp')
    .controller('ChatsCtrl', function($scope, $reactive) {
        $reactive(this).attach($scope);
        
        this.remove = function(chat) { this.data.remove(chat); };
        this.helpers({
            data() {
                return Chats.find();
            }
        });
    });