odoo.define('nemo_pos.CashMovePopup', function (require) {
    'use strict';

    const AbstractAwaitablePopup = require('nemo_pos.AbstractAwaitablePopup');
    const Registries = require('nemo_pos.Registries');
    const { _t } = require('web.core');
    const { parse } = require('web.field_utils');

    class CashMovePopup extends AbstractAwaitablePopup {
        setup() {
            this.state = owl.hooks.useState({
                inputType: '', // '' | 'in' | 'out'
                inputAmount: '',
                inputReason: '',
                inputHasError: false,
            });
            this.inputAmountRef = owl.hooks.useRef('input-amount-ref');
        }
        confirm() {
            try {
                parse.float(this.state.inputAmount);
            } catch (error) {
                this.state.inputHasError = true;
                this.errorMessage = this.env._t('Invalid amount');
                return;
            }
            if (this.state.inputType == '') {
                this.state.inputHasError = true;
                this.errorMessage = this.env._t('Select either Cash In or Cash Out before confirming.');
                return;
            }
            return super.confirm();
        }
        onClickButton(type) {
            this.state.inputType = type;
            this.state.inputHasError = false;
            this.inputAmountRef.el && this.inputAmountRef.el.focus();
        }
        getPayload() {
            return {
                amount: parse.float(this.state.inputAmount),
                reason: this.state.inputReason.trim(),
                type: this.state.inputType,
            };
        }
    }
    CashMovePopup.template = 'nemo_pos.CashMovePopup';
    CashMovePopup.defaultProps = {
        cancelText: _t('Cancel'),
        title: _t('Cash In/Out'),
    };

    Registries.Component.add(CashMovePopup);

    return CashMovePopup;
});
