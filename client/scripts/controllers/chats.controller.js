angular.module('Whatsapp')
    .controller('ChatsCtrl', function($scope, $reactive) {
        $reactive(this).attach($scope);
        
        this.remove = (chat) => { Chats.remove(chat._id); };
        this.helpers({
            data() {
                return Chats.find();
            }
        });
    });