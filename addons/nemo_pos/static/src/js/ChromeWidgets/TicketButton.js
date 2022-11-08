odoo.define('nemo_pos.TicketButton', function (require) {
    'use strict';

    const PosComponent = require('nemo_pos.PosComponent');
    const Registries = require('nemo_pos.Registries');
    const { posbus } = require('nemo_pos.utils');

    class TicketButton extends PosComponent {
        onClick() {
            if (this.props.isTicketScreenShown) {
                posbus.trigger('ticket-button-clicked');
            } else {
                this.showScreen('TicketScreen');
            }
        }
        willPatch() {
            posbus.off('order-deleted', this);
        }
        patched() {
            posbus.on('order-deleted', this, this.render);
        }
        mounted() {
            posbus.on('order-deleted', this, this.render);
        }
        willUnmount() {
            posbus.off('order-deleted', this);
        }
        get count() {
            if (this.env.pos) {
                return this.env.pos.get_order_list().length;
            } else {
                return 0;
            }
        }
    }
    TicketButton.template = 'TicketButton';

    Registries.Component.add(TicketButton);

    return TicketButton;
});
