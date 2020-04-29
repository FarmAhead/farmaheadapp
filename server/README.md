# farmaheadapi :tractor:

### install
```bash
$ python3 -m virtualenv -p $(which python3) venv
$ source venv/bin/activate
$ pip install -e .
```

### configuration
Definitions located at `src/farmahead/core/settings.py`

> TIP: create a `.env` file in this directory and set your environment variables there--it will automatically be sourced during the app startup, is already included in the `.gitignore` to allow you to customize your development setup. Note that this file will NOT override any values that are explicitly set by your shell.

To set via environment variable (mainly for production) use one of
```
FLASK_CONFIG_CLASS=Development  # default, used automatically unless overridden
FLASK_CONFIG_CLASS=Testing
FLASK_CONFIG_CLASS=Production
```

Enumeration of configurable environment variables (to be declared within `.env`)
```
FLASK_CONFIG_CLASS
NODE_ENV
DB_USERNAME
DB_PASSWORD
DB_HOST
DB_NAME
```

### cli
```bash
$ python3 -m farmahead --help
# or, if using virtualenv you can do
$ farmahead --help
```

> TIP: call `farmahead settings` to view the current, complete application configuration

### database
Only need to run this once, you know the drill
```bash
psql -c 'CREATE DATABASE farmahead;'
```

### development:local
Start with a fresh database

> `dropall` asks for confirmation if the `-y` arg is not included
```bash
$ farmahead table dropall -y
$ farmahead table createall
```

Once database is initialized, mock data can be loaded with the farmahead command line tool
````bash
$ farmahead mock all
````

Start the development server, which by default runs on `localhost:8000`
```bash
$ farmahead runserver
```

### development:vm
Refer to the documentation at `../vagrant/README.md`

### deployment
Refer to the documentation at `../ansible/README.md`
