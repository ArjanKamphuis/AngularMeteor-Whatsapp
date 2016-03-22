angular.module('Whatsapp')
    .service('NewChat', function($rootScope, $ionicModal) {
        let templateUrl = 'client/templates/new-chat.html';
        this.showModal = () => {
            this._scope = $rootScope.$new();
            $ionicModal.fromTemplateUrl(templateUrl, {
                scope: this._scope
            }).then((modal) => {
                this._modal = modal;
                modal.show();
            });
        };
        this.hideModal = () => {
            this._scope.$destroy();
            this._modal.remove();
        };
    });