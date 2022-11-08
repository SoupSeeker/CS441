odoo.define('nemo_pos.NotificationSound', function (require) {
    'use strict';

    const { useListener } = require('web.custom_hooks');
    const PosComponent = require('nemo_pos.PosComponent');
    const Registries = require('nemo_pos.Registries');

    class NotificationSound extends PosComponent {
        constructor() {
            super(...arguments);
            useListener('ended', () => (this.props.sound.src = null));
        }
    }
    NotificationSound.template = 'NotificationSound';

    Registries.Component.add(NotificationSound);

    return NotificationSound;
});
