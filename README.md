### Get started by opening your terminal, run ` docker pull postgres:latest ` and ` docker pull soupseeker/nemo:<branch> ` to pull the docker image

#### Next in your terminal, these will set up your named volumes in docker so your data persists:</br>
- `docker run -d -v nemo-db:/var/lib/postgresql/data -e POSTGRES_USER=odoo -e POSTGRES_PASSWORD=odoo -e POSTGRES_DB=postgres --name db postgres:latest`   *** the name must be 'db' for it to link to odoo correctly ***</br>
- `docker run -v nemo:/var/lib/odoo -d -p 8069:8069 --name nemo --link db:db -t soupseeker/nemo:<branch>`

### Once db + nemo are on and running, go to localhost:8069 to initialize the database for odoo, url should be something like `localhost:8069/web/database/selector`, for development keep demo data on

### If using pycharm, go to your `Services` tab to see the docker containers running, click the Nemo container, go to `Volume Bindings` and bind your local addons folder (where the github files are) to the /mnt/extra-addons

### Restart the Nemo container, you should see the nemo_pos. Make changes in your local folder then restart docker container to see changes, restarting db shouldn't matter.
