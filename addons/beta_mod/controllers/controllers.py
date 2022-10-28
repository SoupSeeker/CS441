# -*- coding: utf-8 -*-
from odoo import http


class BetaMod(http.Controller):
    @http.route('/beta_mod/beta_mod', auth='public')
    def index(self, **kw):
        return "Hello, world"

    @http.route('/beta_mod/beta_mod/objects', auth='public')
    def list(self, **kw):
        return http.request.render('beta_mod.listing', {
            'root': '/beta_mod/beta_mod',
            'objects': http.request.env['beta_mod.beta_mod'].search([]),
        })

    @http.route('/beta_mod/beta_mod/objects/<model("beta_mod.beta_mod"):obj>', auth='public')
    def object(self, obj, **kw):
        return http.request.render('beta_mod.object', {
            'object': obj
        })
