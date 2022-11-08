odoo.define('nemo_pos.PSNumpadInputButton', function(require) {
    'use strict';

    const PosComponent = require('nemo_pos.PosComponent');
    const Registries = require('nemo_pos.Registries');

    class PSNumpadInputButton extends PosComponent {
        get _class() {
            return this.props.changeClassTo || 'input-button number-char';
        }
    }
    PSNumpadInputButton.template = 'PSNumpadInputButton';

    Registries.Component.add(PSNumpadInputButton);

    return PSNumpadInputButton;
});
