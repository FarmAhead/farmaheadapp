import logging; log=logging.getLogger(__name__)
import datetime, uuid
from marshmallow import post_dump
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

migrate = Migrate()
db = SQLAlchemy()
ma = Marshmallow()


class BaseModel(db.Model):
    __abstract__ = True
    id =            db.Column(db.Integer, nullable=False, unique=True, primary_key=True)
    created_at =    db.Column(db.DateTime(), nullable=False, default=datetime.datetime.utcnow())
    modified_at =   db.Column(db.DateTime(),nullable=True, onupdate=datetime.datetime.utcnow())


class BaseSchema(ma.SQLAlchemyAutoSchema):

    @post_dump
    def inject_react_uuid(self, data, **kwargs):
        _dict = dict(uuid=uuid.uuid4().hex)
        data.update(_dict)
        return data

