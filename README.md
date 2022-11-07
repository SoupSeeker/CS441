# CS441

## Odoo documentation: https://github.com/odoo/documentation
## Odoo Community Association: https://github.com/OCA lots of good code examples here

### set up named volume for the database and odoo containers
docker run -d -v nemo-db:/var/lib/postgresql/data -e POSTGRES_USER=odoo -e POSTGRES_PASSWORD=odoo -e POSTGRES_DB=postgres --name db postgres:latest<br />
docker run -v nemo:/var/lib/odoo -d -p 8069:8069 --name nemo --link db:db -t soupseeker/nemo:latest -i beta_mod, --init beta_mod


### Get started by ` docker pull soupseeker/nemo:latest `, make sure you've got database container running ` docker pull postgres:latest ` and named before starting nemo

### Once db + nemo are on and running, go to localhost:8069 to initialize the database for odoo, url should be something like `localhost:8069/web/database/selector`

### If using pycharm, go to your `Services` tab to see the docker containers running, click the Nemo container, go to `Volume Bindings` and bind your local folder (where the github files are) to the /mnt/extra-addons

### Restart the Nemo container, you should see the nemo_pos. Make changes in your local folder then restart docker container to see changes, restarting db shouldn't matter.
