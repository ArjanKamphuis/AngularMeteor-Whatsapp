angular.module('Whatsapp')
    .controller('ProfileCtrl', function($scope, $reactive, $state, $ionicPopup, $log, $ionicLoading) {
        $reactive(this).attach($scope);
        let user = Meteor.user();
        let name = user && user.profile ? user.profile.name : '';
        this.name = name;
        this.updateName = () => {
            if (_.isEmpty(this.name)) return;
            Meteor.call('updateName', this.name, (err) => {
                if (err) return handleError(err);
                $state.go('tab.chats');
            });
        }
        this.updatePicture = () => {
            MeteorCamera.getPicture({ width: 240, height: 240 }, (err, data) => {
                if (err && err.error === 'cancel') return;
                if (err) return handleError(err);
                $ionicLoading.show({ template: 'Updating picture...' });
                Meteor.call('updatePicture', data, (err) => {
                    $ionicLoading.hide();
                    if (err) handleError(err);
                });
            });
        }
        function handleError(err) {
            $log.error('profile save error ', err);
            $ionicPopup.alert({
                title: err.reason || 'Save failed',
                template: 'Please try again',
                okType: 'button-positive button-clear'
            });
        }
    });