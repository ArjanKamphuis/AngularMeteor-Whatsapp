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
    }
});