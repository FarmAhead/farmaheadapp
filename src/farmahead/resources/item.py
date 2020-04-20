import logging; log=logging.getLogger(__name__)
from flask import current_app
from flask import request, jsonify
from flask_restful import Resource

from farmahead.models import db, ItemModel, ItemSchema
from farmahead.utils import reply_success, reply_error, reply_missing

schema = ItemSchema()             # dict
schemas = ItemSchema(many=True)   # list


class ItemResource(Resource):
    '''
    TABLE:  items
    MODEL:  models.item.ItemModel
    SCHEMA: models.item.ItemSchema

    /api/item
    /api/item?id=1
    '''

    @staticmethod
    def get_one(_id):
        log.debug(f'Querying ItemModel where id={_id}')
        res = db.session.query(ItemModel).filter_by(id=_id).first()
        return res

    @staticmethod
    def get_all():
        log.debug(f'Querying ItemModel for all rows')
        res = db.session.query(ItemModel).all()
        return res

    def get(self):
        # Retrieve existing item(s)
        _id = request.args.get('id')
        if not _id:
            res = self.get_all()
            return reply_success(schemas.dump(res))
        res = self.get_one(_id)
        if not res:
            return reply_missing(id=_id)
        return reply_success(schema.dump(res))

    def post(self):
        # Create new item(s)
        payload = request.get_json()
        try:
            obj = schema.load(payload)
            db.session.add(obj)
            db.session.commit()
            return reply_success(schema.dump(obj))
        except Exception as err:
            log.error(err)
            return reply_error(str(err))

    def put(self):
        # Update existing item(s)
        log.warning('This route is not yet implemented')
        pass

    def delete(self):
        # Remove existing item(s)
        log.warning('This route is not yet implemented')
        pass