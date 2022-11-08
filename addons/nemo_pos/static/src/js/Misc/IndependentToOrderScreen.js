odoo.define('nemo_pos.IndependentToOrderScreen', function (require) {
    'use strict';

    const PosComponent = require('nemo_pos.PosComponent');

    class IndependentToOrderScreen extends PosComponent {
        /**
         * Alias the forceTriggerSelectedOrder method as it also
         * means 'closing' this screen.
         */
        close() {
            this.forceTriggerSelectedOrder();
        }
        forceTriggerSelectedOrder() {
            // Calling this method forcefully trigger change
            // on the selectedOrder attribute, which then shows the screen of the
            // current order, essentially closing this screen.
            this.env.pos.trigger('change:selectedOrder', this.env.pos, this.env.pos.get_order());
        }
    }

    return IndependentToOrderScreen;
});
