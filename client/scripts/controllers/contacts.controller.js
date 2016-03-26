angular.module('Whatsapp')
    .controller('ContactsCtrl', function($scope, $reactive, $state) {
        $reactive(this).attach($scope);
        this.helpers({
            data() {
                return Meteor.users.find({ _id: { $ne: Meteor.userId() } });
            }
        });
        this.newChat = function(userId) {
            let chat = Chats.findOne({ userIds: { $all: [Meteor.userId(), userId] } });
            if (chat) { return goToChat(chat._id); }
            let newChatId = Meteor.call('newChat', userId, (error, result) => { goToChat(result); } );
        };
        function goToChat(chatId) {
            return $state.go('tab.chat', { chatId: chatId });
        }
    });