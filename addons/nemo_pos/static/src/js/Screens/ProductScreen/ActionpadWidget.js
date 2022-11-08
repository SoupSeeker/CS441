odoo.define('nemo_pos.ActionpadWidget', function(require) {
    'use strict';

    const PosComponent = require('nemo_pos.PosComponent');
    const Registries = require('nemo_pos.Registries');

    /**
     * @props client
     * @emits click-customer
     * @emits click-pay
     */
    class ActionpadWidget extends PosComponent {
        get isLongName() {
            return this.client && this.client.name.length > 10;
        }
        get client() {
            return this.props.client;
        }
    }
    ActionpadWidget.template = 'ActionpadWidget';
    ActionpadWidget.defaultProps = {
        isActionButtonHighlighted: false,
    }

    Registries.Component.add(ActionpadWidget);

    return ActionpadWidget;
});
