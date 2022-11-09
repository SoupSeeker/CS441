odoo.define('nemo_pos.WrappedProductNameLines', function(require) {
    'use strict';

    const PosComponent = require('nemo_pos.PosComponent');
    const Registries = require('nemo_pos.Registries');

    class WrappedProductNameLines extends PosComponent {
        constructor() {
            super(...arguments);
            this.line = this.props.line;
        }
    }
    WrappedProductNameLines.template = 'WrappedProductNameLines';

    Registries.Component.add(WrappedProductNameLines);

    return WrappedProductNameLines;
});
