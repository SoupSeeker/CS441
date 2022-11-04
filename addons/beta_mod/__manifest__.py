# -*- coding: utf-8 -*-
{
    'name': "beta_mod",

    'summary': """
         A customized point of sale for Nemo Inc. (CSUSM CS441 Project Fall 2022)""",

    'description': """
        A customized point of sale for Nemo
    """,

    'author': "Nemo Inc.",
    'website': "https://github.com/soupseeker/cs441",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/15.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    # 
    # added point_of_sale, maybe we can get it preinstalled and preactivated with -i --init tags?
    # update: tried adding point_of_sale as depends, whole thing took a dump
    'depends': ['base'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
}