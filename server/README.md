# farmaheadapi :tractor:

### install
```bash
$ pip install -e .
```

### configuration
Definitions located at `src/farmahead/core/settings.py`

To set via environment variable (mainly for production) use one of
```
FLASK_CONFIG_CLASS=Development  # default, used automatically unless overridden
FLASK_CONFIG_CLASS=Testing
FLASK_CONFIG_CLASS=Production
```
For Production environment, the following environmental variables are used for connections to RDS

```
RDS_HOST=the-rds-host
RDS_USERNAME=postgres
RDS_PASSWORD=potgres'-password
RDS_NAME=the-db-name
```

### database
Only need to run this once, you know the drill
```bash
psql -c 'CREATE DATABASE farmahead_dev;'
```

### cli
```bash
$ python3 -m farmahead --help
# or, if using virtualenv you can do
$ farmahead --help
```

### development
```bash
$ farmahead table createall
$ farmahead runserver
```
Start with a fresh database, asks for confirmation if the `-y` arg is not included
```bash
$ farmahead table dropall -y
```

### mock data
Once database is initialized, mock data can be loaded with the farmahead command line tool
````bash
$ farmahead mock all
````

### deployment configuration for production
If you are using a production deployment (RDS), your environmental variables must be kept in an environment file that gunicorn can reference and read

```
FLASK_CONFIG_CLASS=Production
RDS_HOST=the-rds-host
RDS_USERNAME=postgres
RDS_PASSWORD=potgres'-password
RDS_NAME=the-db-name
```

### deployment configuration for all
The gunicorn configuration must be configured per machine to account for the service user and installation path

farmaheadapi/conf/gunicorn.conf
```
[Service]
User={service-user}
Group=www-data
WorkingDirectory={path-to-farmaheadapi}
EnvironmentFile={path-to-farmaheadapi}
Environment="PATH={path-to-farmaheadapi}/env/bin"
ExecStart={path-to-farmaheadapi}/env/bin/gunicorn \
          --workers 3 \
          --bind unix:farmaheadapi.sock \
          -m 007 farmahead.core.wsgi:application \
          --error-logfile gunicorn-access.log \
          --log-file gunicorn-error.log \
          --log-level DEBUG \
```
farmahead/conf/farmaheadapi.conf
```
server {
    listen 80;

    location / {
        include proxy_params;
        proxy_pass http://unix:{path-to-farmaheadapi}/farmaheadapi.sock;
    }
}
```

### deployment

```bash
# Clone the repo (must be in the location specified)
$ git clone https://github.com/b-f-c/farmaheadapi /home/ec2-user/farmaheadapi
$ cd /home/ec2-user/farmaheadapi
# Create a virtualenv
$ python3 -m virtualenv env
$ source env/bin/activate
$ python3 -m pip install -e .
$ psql -c 'CREATE DATABASE farmahead;'
$ python3 -m farmahead table createall
$ sudo ./INSTALL.sh
```
You should now be able to `curl localhost/api/version` successfully, as well as access the application on port 80 from the outside.
