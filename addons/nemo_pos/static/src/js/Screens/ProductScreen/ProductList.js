odoo.define('nemo_pos.ProductList', function(require) {
    'use strict';

    const PosComponent = require('nemo_pos.PosComponent');
    const Registries = require('nemo_pos.Registries');

    class ProductList extends PosComponent {}
    ProductList.template = 'ProductList';

    Registries.Component.add(ProductList);

    return ProductList;
});
