# CS441

## Odoo documentation: https://github.com/odoo/documentation
## Odoo Community Association: https://github.com/OCA lots of good code examples here

###set up named volume for the database and odoo containers
docker run -d -v nemo-db:/var/lib/postgresql/data -e POSTGRES_USER=odoo -e POSTGRES_PASSWORD=odoo -e POSTGRES_DB=postgres --name db postgres:latest
docker run -v nemo:/var/lib/odoo -d -p 8069:8069 --name nemo --link db:db -t soupseeker/nemo:latest -i beta_mod, --init beta_mod