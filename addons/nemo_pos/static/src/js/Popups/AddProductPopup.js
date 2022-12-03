odoo.define('nemo_pos.AddProductPopup', function(require) {
    'use strict';

    const AbstractAwaitablePopup = require('nemo_pos.AbstractAwaitablePopup');
    const Registries = require('nemo_pos.Registries');
    const { posbus } = require('nemo_pos.utils');
    const { ConnectionLostError } = require('@web/core/network/rpc_service');
    const { parse } = require('web.field_utils');

    /**
     * This popup needs to be self-dependent because it needs to be called from different place. In order to avoid code
     * Props:
     *  {
     *      product: a product object
     *      quantity: number
     *  }
     */
    class AddProductPopup extends AbstractAwaitablePopup {
        setup() {
            this.state = owl.hooks.useState({
                inputName: '',
                inputBarcode: '',
                inputPrice: '',
                inputHasError: false,
            });
            this.inputNameRef = owl.hooks.useRef('product-name-ref');
            this.inputBarcodeRef = owl.hooks.useRef('product-barcode-ref');
            this.inputPriceRef = owl.hooks.useRef('product-price-ref');
        }
        async confirm() {
            if(this.state.inputName == ''){
                this.state.inputHasError = true;
                this.errorMessage = this.env._t('No name provided');
                return;
            }
            if (this.state.inputBarcode == '') {
                this.state.inputHasError = true;
                this.errorMessage = this.env._t('No barcode provided');
                return;
            }
            if (this.state.inputPrice == '') {
                this.state.inputHasError = true;
                this.errorMessage = this.env._t('No price provided');
                return;
            }
            try {
                parse.float(this.state.inputPrice);
            } catch (error) {
                this.state.inputHasError = true;
                this.errorMessage = this.env._t('Invalid price');
                return;
            }


            await this.rpc({
                model: 'product.template',
                method: 'create',
                args: [{"available_in_pos": true, "barcode" : `${this.state.inputBarcode}`, "categ_id" : "9", "default_code" : "1", "list_price" : `${this.state.inputPrice}`, "name" : `${this.state.inputName}`, "pos_categ_id" : 1, "standard_price" : "1", "type" : "consu"}]
                });

            return super.confirm();
        }
        /* Overwriting the getPayload() from AbstractAwaitablePopup.js file, this is what is returned when we confirm*/
        getPayload() {
            return {
                name: this.state.inputName,
                barcode: this.state.inputBarcode,
                price: parse.float(this.state.inputPrice),
            };
        }


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
