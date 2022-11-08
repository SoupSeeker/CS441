odoo.define('nemo_pos.CategorySimpleButton', function(require) {
    'use strict';

    const PosComponent = require('nemo_pos.PosComponent');
    const Registries = require('nemo_pos.Registries');

    class CategorySimpleButton extends PosComponent {}
    CategorySimpleButton.template = 'CategorySimpleButton';

    Registries.Component.add(CategorySimpleButton);

    return CategorySimpleButton;
});
