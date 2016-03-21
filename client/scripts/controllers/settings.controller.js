angular.module('Whatsapp')
    .controller('SettingsCtrl', function($scope, $reactive, $state) {
        $reactive(this).attach($scope);
        this.logout = () => {
            Meteor.logout((err) => {
                $state.go('login');
            });
        }
    });