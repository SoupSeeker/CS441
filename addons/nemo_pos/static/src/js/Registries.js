odoo.define('nemo_pos.Registries', function(require) {
    'use strict';

    /**
     * This definition contains all the instances of ClassRegistry.
     */

    const ComponentRegistry = require('nemo_pos.ComponentRegistry');

    return { Component: new ComponentRegistry() };
});
