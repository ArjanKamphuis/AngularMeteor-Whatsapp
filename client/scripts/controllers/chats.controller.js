angular.module('Whatsapp')
    .controller('ChatsCtrl', function($scope, $reactive, NewChat) {
        $reactive(this).attach($scope);
        this.showNewChatModal = () => { NewChat.showModal(); }
        this.remove = (chat) => { Meteor.call('removeChat', chat._id); };
        this.helpers({
            data() {
                return Chats.find();
            }
        });
    });