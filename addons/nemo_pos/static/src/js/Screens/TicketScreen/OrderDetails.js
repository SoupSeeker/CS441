odoo.define('nemo_pos.OrderDetails', function (require) {
    'use strict';

    const PosComponent = require('nemo_pos.PosComponent');
    const Registries = require('nemo_pos.Registries');

    /**
     * @props {models.Order} order
     */
    class OrderDetails extends PosComponent {
        get order() {
            return this.props.order;
        }
        get orderlines() {
            return this.order ? this.order.orderlines.models : [];
        }
        get total() {
            return this.env.pos.format_currency(this.order ? this.order.get_total_with_tax() : 0);
        }
        get tax() {
            return this.env.pos.format_currency(this.order ? this.order.get_total_tax() : 0)
        }
    }
    OrderDetails.template = 'OrderDetails';

    Registries.Component.add(OrderDetails);

    return OrderDetails;
});
