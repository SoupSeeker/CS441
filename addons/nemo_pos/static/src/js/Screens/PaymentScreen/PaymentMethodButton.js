odoo.define('nemo_pos.PaymentMethodButton', function(require) {
    'use strict';

    const PosComponent = require('nemo_pos.PosComponent');
    const Registries = require('nemo_pos.Registries');

    class PaymentMethodButton extends PosComponent {}
    PaymentMethodButton.template = 'PaymentMethodButton';

    Registries.Component.add(PaymentMethodButton);

    return PaymentMethodButton;
});
