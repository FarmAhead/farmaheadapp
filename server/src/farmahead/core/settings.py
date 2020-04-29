from farmahead import __version__
import os
from dotenv import load_dotenv
load_dotenv()

class Settings:

    def __init__(self):
        self.APP_VERSION = __version__
        self.APPLICATION_ROOT = '/api'
        self.HOST = 'localhost'
        self.PORT = 8000
        self.SQLALCHEMY_TRACK_MODIFICATIONS = False
        self.LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
        self.LOG_FILE = os.getenv('LOG_FILE', 'flask.log')
        self.DB_USERNAME = os.getenv('DB_USERNAME', 'postgres')
        self.DB_PASSWORD = os.getenv('DB_PASSWORD', 'password')
        self.DB_HOST = os.getenv('DB_HOST', 'localhost')
        self.DB_NAME = os.getenv('DB_NAME', 'farmahead')


class Development(Settings):

    def __init__(self):
        Settings.__init__(self)
        self.ENV = 'Development'
        self.DEBUG = True
        self.TESTING = False
        self.SQLALCHEMY_DATABASE_URI = f'postgresql://{self.DB_USERNAME}:{self.DB_PASSWORD}@localhost/{self.DB_NAME}'


class Testing(Settings):

    def __init__(self):
        Settings.__init__(self)
        self.ENV = 'Testing'
        self.DEBUG = True
        self.TESTING = True
        self.SQLALCHEMY_DATABASE_URI = f'postgresql://{self.DB_USERNAME}:{self.DB_PASSWORD}@localhost/{self.DB_NAME}'


class Production(Settings):

    def __init__(self):
        Settings.__init__(self)
        self.ENV = 'Production'
        self.DEBUG = False
        self.TESTING = False
        self.SQLALCHEMY_DATABASE_URI = f'postgresql://{self.DB_USERNAME}:{self.DB_PASSWORD}@{self.DB_HOST}/{self.DB_NAME}'
