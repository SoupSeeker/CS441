odoo.define('nemo_pos.ErrorPopup', function(require) {
    'use strict';

    const AbstractAwaitablePopup = require('nemo_pos.AbstractAwaitablePopup');
    const Registries = require('nemo_pos.Registries');
    const { _lt } = require('@web/core/l10n/translation');

    // formerly ErrorPopupWidget
    class ErrorPopup extends AbstractAwaitablePopup {
        mounted() {
            this.playSound('error');
        }
    }
    ErrorPopup.template = 'ErrorPopup';
    ErrorPopup.defaultProps = {
        confirmText: _lt('Ok'),
        cancelText: _lt('Cancel'),
        title: _lt('Error'),
        body: '',
    };

    Registries.Component.add(ErrorPopup);

    return ErrorPopup;
});
