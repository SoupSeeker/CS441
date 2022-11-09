odoo.define('nemo_pos.Notification', function (require) {
    'use strict';

    const { useListener } = require('web.custom_hooks');
    const PosComponent = require('nemo_pos.PosComponent');
    const Registries = require('nemo_pos.Registries');

    class Notification extends PosComponent {
        constructor() {
            super(...arguments)
            useListener('click', this.closeNotification);
        }
        mounted() {
            setTimeout(() => {
                this.closeNotification();
            }, this.props.duration)
        }
    }
    Notification.template = 'Notification';

    Registries.Component.add(Notification);

    return Notification;
});
