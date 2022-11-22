odoo.define('nemo_pos.AddProductPopup', function(require) {
    'use strict';

    const AbstractAwaitablePopup = require('nemo_pos.AbstractAwaitablePopup');
    const Registries = require('nemo_pos.Registries');
    const { posbus } = require('nemo_pos.utils')
    const { ConnectionLostError } = require('@web/core/network/rpc_service')

    /**
     * This popup needs to be self-dependent because it needs to be called from different place. In order to avoid code
     * Props:
     *  {
     *      product: a product object
     *      quantity: number
     *  }
     */
    class AddProductPopup extends AbstractAwaitablePopup {
        constructor() {
            super(...arguments);
            Object.assign(this, this.props.info);
        }
        /**
         * @deprecated Don't remove. There might be overrides.
         */
        async willStart() {

        }
        /*
         * Since this popup need to be self dependent, in case of an error, the popup need to be closed on its own.
         */
        mounted() {
            if (this.error) {
                this.cancel();
                if (this.error.message instanceof ConnectionLostError) {
                    this.showPopup('ErrorPopup', {
                        title: this.env._t('Network Error'),
                        body: this.env._t('Cannot access product addition service.'),
                    });
                } else {
                    throw this.error;
                }
            }
        }

    }

    AddProductPopup.template = 'AddProductPopup';
    Registries.Component.add(AddProductPopup);
});
