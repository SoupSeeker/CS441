odoo.define('nemo_pos.ReprintReceiptButton', function (require) {
    'use strict';

    const { useListener } = require('web.custom_hooks');
    const PosComponent = require('nemo_pos.PosComponent');
    const Registries = require('nemo_pos.Registries');

    class ReprintReceiptButton extends PosComponent {
        constructor() {
            super(...arguments);
            useListener('click', this._onClick);
        }
        async _onClick() {
            if (!this.props.order) return;
            this.showScreen('ReprintReceiptScreen', { order: this.props.order });
        }
    }
    ReprintReceiptButton.template = 'ReprintReceiptButton';
    Registries.Component.add(ReprintReceiptButton);

    return ReprintReceiptButton;
});
