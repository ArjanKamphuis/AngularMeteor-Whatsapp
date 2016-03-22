Meteor.methods({
    newMessage: (message) => {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-logged-in', 'Must be logged in to send message.');
        }
        check(message, {
            text: String,
            chatId: String,
            type: String
        });
        message.timestamp = new Date();
        message.userId = Meteor.userId();
        let messageId = Messages.insert(message);
        Chats.update(message.chatId, { $set: { lastMessage: message } });
        return messageId;
    },
    updateName: (name) => {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-logged-in', 'Must be logged in to update this name');
        }
        check(name, String);
        if (name.length === 0) {
            throw new Meteor.Error('name-required', 'Must provide user name');
        }
        return Meteor.users.update(Meteor.userId(), { $set: { 'profile.name': name } });
    },
    newChat: (otherId) => {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-logged in', 'Must be logged to create a chat.');
        }
        check(otherId, String);
        let otherUser = Meteor.users.findOne(otherId);
        if (!otherUser) {
            throw new Meteor.Error('user-not-exists', 'Chat\'s user not exists');
        }
        let chat = {
            userIds: [Meteor.userId(), otherId],
            createdAt: new Date()
        };
        let chatId = Chats.insert(chat);
        return chatId;
    },
    removeChat: (chatId) => {
        if (!Meteor.user()) {
            throw new Meteor.Error('not-logged-in', 'Must be logged in to remove chat.');
        }
        check(chatId, String);
        let chat = Chats.findOne(chatId);
        if (!chat || !_.include(chat.userIds, Meteor.userId())) {
            throw new Meteor.Error('chat-not-exists', 'Chat not exists');
        }
        Messages.remove({ chatId: chatId });
        return Chats.remove({ _id: chatId });
    }
});