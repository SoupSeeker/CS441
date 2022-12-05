odoo.define('nemo_pos.AddProductButton', function (require) {
    'use strict';

    const PosComponent = require('nemo_pos.PosComponent');
    const ProductScreen = require('nemo_pos.ProductScreen');
    const Registries = require('nemo_pos.Registries');
    const { useListener } = require('web.custom_hooks');

    class AddProductButton extends PosComponent {
        constructor() {
            super(...arguments);
            useListener('click', this._onClick);
        }
        _onClick() {
            //Need to define this
            this.showPopup('AddProductPopup');
        }
    }
    AddProductButton.template = 'nemo_pos.AddProductButton';

    ProductScreen.addControlButton({
        component: AddProductButton,
        condition: function () {
            return true;
        },
    });

    Registries.Component.add(AddProductButton);

    return AddProductButton;
});
