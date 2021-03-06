Meteor.methods({
    newMessage: function(message) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in', 'Must be logged in to send message.');
        }
        check(message, Match.OneOf(
            { text: String, chatId: String, type: String },
            { picture: String, chatId: String, type: String }
        ));
        message.timestamp = new Date();
        message.userId = this.userId;
        let messageId = Messages.insert(message);
        Chats.update(message.chatId, { $set: { lastMessage: message } });
        return messageId;
    },
    updateName: function(name) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in', 'Must be logged in to update this name');
        }
        check(name, String);
        if (name.length === 0) {
            throw new Meteor.Error('name-required', 'Must provide user name');
        }
        return Meteor.users.update(this.userId, { $set: { 'profile.name': name } });
    },
    newChat: function(otherId) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged in', 'Must be logged to create a chat.');
        }
        check(otherId, String);
        let otherUser = Meteor.users.findOne(otherId);
        if (!otherUser) {
            throw new Meteor.Error('user-not-exists', 'Chat\'s user not exists');
        }
        let chat = {
            userIds: [this.userId, otherId],
            createdAt: new Date()
        };
        let chatId = Chats.insert(chat);
        return chatId;
    },
    removeChat: function(chatId) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in', 'Must be logged in to remove chat.');
        }
        check(chatId, String);
        let chat = Chats.findOne(chatId);
        if (!chat || !_.include(chat.userIds, this.userId)) {
            throw new Meteor.Error('chat-not-exists', 'Chat not exists');
        }
        Messages.remove({ chatId: chatId });
        return Chats.remove({ _id: chatId });
    },
    updatePicture: function(data) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in', 'Must be logged in to update this picture.');
        }
        check(data, String);
        return Meteor.users.update(this.userId, { $set: { 'profile.picture': data }});
    }
});