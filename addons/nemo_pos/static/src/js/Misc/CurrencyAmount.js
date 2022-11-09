odoo.define('nemo_pos.CurrencyAmount', function(require) {
    'use strict';

    const PosComponent = require('nemo_pos.PosComponent');
    const Registries = require('nemo_pos.Registries');

    class CurrencyAmount extends PosComponent {}
    CurrencyAmount.template = 'CurrencyAmount';

    Registries.Component.add(CurrencyAmount);

    return CurrencyAmount;
});
