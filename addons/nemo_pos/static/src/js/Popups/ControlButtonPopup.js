odoo.define('nemo_pos.ControlButtonPopup', function(require) {
    'use strict';

    const AbstractAwaitablePopup = require('nemo_pos.AbstractAwaitablePopup');
    const Registries = require('nemo_pos.Registries');
    const { _lt } = require('@web/core/l10n/translation');

    class ControlButtonPopup extends AbstractAwaitablePopup {
        /**
         * @param {Object} props
         * @param {string} props.startingValue
         */
        constructor() {
            super(...arguments);
            this.controlButtons = this.props.controlButtons;
        }
    }
    ControlButtonPopup.template = 'ControlButtonPopup';
    ControlButtonPopup.defaultProps = {
        cancelText: _lt('Back'),
        controlButtons: []
    };

    Registries.Component.add(ControlButtonPopup);

    return ControlButtonPopup;
});
