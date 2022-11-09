odoo.define('nemo_pos.HeaderButton', function(require) {
    'use strict';

    const PosComponent = require('nemo_pos.PosComponent');
    const Registries = require('nemo_pos.Registries');

    // Previously HeaderButtonWidget
    // This is the close session button
    class HeaderButton extends PosComponent {
        async onClick() {
            const info = await this.env.pos.getClosePosInfo();
            this.showPopup('ClosePosPopup', { info: info });
        }
    }
    HeaderButton.template = 'HeaderButton';

    Registries.Component.add(HeaderButton);

    return HeaderButton;
});
