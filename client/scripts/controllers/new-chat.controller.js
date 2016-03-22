angular.module('Whatsapp')
    .controller('NewChatCtrl', function($scope, $reactive, $state, NewChat) {
        $reactive(this).attach($scope);
        this.hideNewChatModal = hideNewChatModal;
        this.newChat = (userId) => {
            let chat = Chats.findOne({ userIds: { $all: [Meteor.userId(), userId] } });
            if (chat) { return goToChat(chat._id); }
            let newChatId =  Meteor.call('newChat', userId, (error, result) => { goToChat(result); });
        };
        this.subscribe('users');
        this.helpers({
            users() {
                return Meteor.users.find({ _id: { $ne: Meteor.userId() } });
            }
        });
        
        function goToChat(chatId) {
            hideNewChatModal();
            return $state.go('tab.chat', { chatId: chatId });
        }
        function hideNewChatModal() {
            NewChat.hideModal();
        }
    });