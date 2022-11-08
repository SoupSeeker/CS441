odoo.define('nemo_pos.CashierName', function(require) {
    'use strict';

    const PosComponent = require('nemo_pos.PosComponent');
    const Registries = require('nemo_pos.Registries');

    // Previously UsernameWidget
    class CashierName extends PosComponent {
        get username() {
            const { name } = this.env.pos.get_cashier();
            return name ? name : '';
        }
        get avatar() {
            const { user_id } = this.env.pos.get_cashier();
            const id = user_id && user_id.length ? user_id[0] : -1;
            return `/web/image/res.users/${id}/avatar_128`;
        }
    }
    CashierName.template = 'CashierName';

    Registries.Component.add(CashierName);

    return CashierName;
});
