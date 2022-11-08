odoo.define('nemo_pos.OrderImportPopup', function(require) {
    'use strict';

    const AbstractAwaitablePopup = require('nemo_pos.AbstractAwaitablePopup');
    const Registries = require('nemo_pos.Registries');
    const { _lt } = require('@web/core/l10n/translation');

    // formerly OrderImportPopupWidget
    class OrderImportPopup extends AbstractAwaitablePopup {
        get unpaidSkipped() {
            return (
                (this.props.report.unpaid_skipped_existing || 0) +
                (this.props.report.unpaid_skipped_session || 0)
            );
        }
        getPayload() {}
    }
    OrderImportPopup.template = 'OrderImportPopup';
    OrderImportPopup.defaultProps = {
        confirmText: _lt('Ok'),
        cancelText: _lt('Cancel'),
        body: '',
    };

    Registries.Component.add(OrderImportPopup);

    return OrderImportPopup;
});
