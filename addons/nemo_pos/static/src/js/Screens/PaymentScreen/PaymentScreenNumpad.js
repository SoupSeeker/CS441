odoo.define('nemo_pos.PaymentScreenNumpad', function(require) {
    'use strict';

    const PosComponent = require('nemo_pos.PosComponent');
    const Registries = require('nemo_pos.Registries');

    class PaymentScreenNumpad extends PosComponent {
        constructor() {
            super(...arguments);
            this.decimalPoint = this.env._t.database.parameters.decimal_point;
        }
    }
    PaymentScreenNumpad.template = 'PaymentScreenNumpad';

    Registries.Component.add(PaymentScreenNumpad);

    return PaymentScreenNumpad;
});
