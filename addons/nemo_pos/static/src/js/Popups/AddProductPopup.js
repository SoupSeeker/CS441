odoo.define('nemo_pos.AddProductPopup', function(require) {
    'use strict';

    const AbstractAwaitablePopup = require('nemo_pos.AbstractAwaitablePopup');
    const Registries = require('nemo_pos.Registries');
    const { posbus } = require('nemo_pos.utils');
    const { getDataURLFromFile } = require('web.utils');
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
            this.changes = {}
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

            console.log(this.changes.image_1920.split("base64,")[1])

            await this.rpc({
                model: 'product.template',
                method: 'create',
                args: [{"image_1920": `${this.changes.image_1920 ? this.changes.image_1920.split("base64,")[1] : false}`,"available_in_pos": true, "barcode" : `${this.state.inputBarcode}`, "categ_id" : "9", "default_code" : "1", "list_price" : `${this.state.inputPrice}`, "name" : `${this.state.inputName}`, "pos_categ_id" : 1, "standard_price" : "1", "type" : "consu"}]
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
        get partnerImageUrl() {
            // We prioritize image_1920 in the `changes` field because we want
            // to show the uploaded image without fetching new data from the server.
            const partner = this.props.partner;
            if (this.changes.image_1920) {
                return this.changes.image_1920;
            } else {
                return false;
            }
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
        async uploadImage(event) {
            const file = event.target.files[0];
            if (!file.type.match(/image.*/)) {
                await this.showPopup('ErrorPopup', {
                    title: this.env._t('Unsupported File Format'),
                    body: this.env._t(
                        'Only web-compatible Image formats such as .png or .jpeg are supported.'
                    ),
                });
            } else {
                const imageUrl = await getDataURLFromFile(file);
                this.img = imageUrl
                const loadedImage = await this._loadImage(imageUrl);
                if (loadedImage) {
                    const resizedImage = await this._resizeImage(loadedImage, 800, 600);
                    this.changes.image_1920 = resizedImage.toDataURL();
                    // Rerender to reflect the changes in the screen
                    this.render();
                }
            }
        }
        _resizeImage(img, maxwidth, maxheight) {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var ratio = 1;

            if (img.width > maxwidth) {
                ratio = maxwidth / img.width;
            }
            if (img.height * ratio > maxheight) {
                ratio = maxheight / img.height;
            }
            var width = Math.floor(img.width * ratio);
            var height = Math.floor(img.height * ratio);

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            return canvas;
        }
        /**
         * Loading image is converted to a Promise to allow await when
         * loading an image. It resolves to the loaded image if succesful,
         * else, resolves to false.
         *
         * [Source](https://stackoverflow.com/questions/45788934/how-to-turn-this-callback-into-a-promise-using-async-await)
         */
        _loadImage(url) {
            return new Promise((resolve) => {
                const img = new Image();
                img.addEventListener('load', () => resolve(img));
                img.addEventListener('error', () => {
                    this.showPopup('ErrorPopup', {
                        title: this.env._t('Loading Image Error'),
                        body: this.env._t(
                            'Encountered error when loading image. Please try again.'
                        ),
                    });
                    resolve(false);
                });
                img.src = url;
            });
        }
    }
    AddProductPopup.template = 'AddProductPopup';
    Registries.Component.add(AddProductPopup);
});
