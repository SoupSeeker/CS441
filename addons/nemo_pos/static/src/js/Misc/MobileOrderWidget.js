odoo.define('nemo_pos.MobileOrderWidget', function(require) {
    'use strict';

    const PosComponent = require('nemo_pos.PosComponent');
    const Registries = require('nemo_pos.Registries');

    class MobileOrderWidget extends PosComponent {
        constructor() {
            super(...arguments);
            this.update();
        }
        get order() {
            return this.env.pos.get_order();
        }
        mounted() {
          this.order.on('change', () => {
              this.update();
              this.render();
          });
          this.order.orderlines.on('change', () => {
              this.update();
              this.render();
          });
        }
        update() {
            const total = this.order ? this.order.get_total_with_tax() : 0;
            const tax = this.order ? total - this.order.get_total_without_tax() : 0;
            this.total = this.env.pos.format_currency(total);
            this.items_number = this.order ? this.order.orderlines.reduce((items_number,line) => items_number + line.quantity, 0) : 0;
        }
    }

    MobileOrderWidget.template = 'MobileOrderWidget';

    Registries.Component.add(MobileOrderWidget);

    return MobileOrderWidget;
});
