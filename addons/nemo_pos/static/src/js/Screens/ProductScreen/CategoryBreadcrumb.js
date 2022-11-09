odoo.define('nemo_pos.CategoryBreadcrumb', function(require) {
    'use strict';

    const PosComponent = require('nemo_pos.PosComponent');
    const Registries = require('nemo_pos.Registries');

    class CategoryBreadcrumb extends PosComponent {}
    CategoryBreadcrumb.template = 'CategoryBreadcrumb';

    Registries.Component.add(CategoryBreadcrumb);

    return CategoryBreadcrumb;
});
