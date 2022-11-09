odoo.define('nemo_pos.PaymentScreenElectronicPayment', function (require) {
    'use strict';

    const PosComponent = require('nemo_pos.PosComponent');
    const Registries = require('nemo_pos.Registries');

    class PaymentScreenElectronicPayment extends PosComponent {
        mounted() {
            this.props.line.on('change', this.render, this);
        }
        willUnmount() {
            if (this.props.line) {
                // It could be that the line is deleted before unmounting the element.
                this.props.line.off('change', null, this);
            }
        }
    }
    PaymentScreenElectronicPayment.template = 'PaymentScreenElectronicPayment';

    Registries.Component.add(PaymentScreenElectronicPayment);

    return PaymentScreenElectronicPayment;
});
