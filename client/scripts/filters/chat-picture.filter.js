angular.module('Whatsapp')
    .filter('chatPicture', function() {
        return (chat) => {
            if (!chat) return;
            let otherId = _.without(chat.userIds, Meteor.userId())[0];
            let otherUser = Meteor.users.findOne(otherId);
            let hasPicture = otherUser && otherUser.profile && otherUser.profile.picture;
            return hasPicture ? otherUser.profile.picture : chat.picture || '/user-default.svg';
        };
    });