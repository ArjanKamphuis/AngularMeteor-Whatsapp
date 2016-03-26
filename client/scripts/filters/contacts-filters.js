angular.module('Whatsapp')
    .filter('contactsPicture', function() {
        return function(contact) {
            let hasPicture = contact.profile.picture;
            return hasPicture ? contact.profile.picture : '/user-default.svg';
        };
    })
    .filter('contactsName', function() {
        return function(contact) {
            let hasName = contact.profile.name;
            return hasName ? contact.profile.name : 'NO NAME';
        };
    });