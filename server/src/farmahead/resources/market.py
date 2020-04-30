import logging

from farmahead.utils.exceptions import ParamTypeException

from flask import request
from flask_restful import Resource, reqparse

from farmahead.models import db, MarketModel, MarketSchema, VendorProduceModel, VendorModel, MarketVendorModel
from farmahead.utils import reply_success, reply_error, reply_missing, ValidateParameters
from farmahead.utils.zips import ZipCodes

log = logging.getLogger(__name__)


schema = MarketSchema()  # dict
schemas = MarketSchema(many=True)  # list


class MarketResource(Resource):
    """
    TABLE:  market
    MODEL:  models.market.MarketModel
    SCHEMA: models.market.MarketSchema

    /api/market
    /api/market?id=1
    """

    @staticmethod
    def get_one(_id):
        log.debug(f'Querying MarketModel where id={_id}')
        res = db.session.query(MarketModel).filter_by(id=_id).first()
        return res

    @staticmethod
    def get_all():
        log.debug(f'Querying MarketModel for all rows')
        res = db.session.query(MarketModel).all()
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


class MarketByZipResource(Resource):
    """
    TABLE:  market
    MODEL:  models.market.MarketModel
    SCHEMA: models.market.MarketSchema

    /api/market/zipcode/{zipcode}
    """

    def get(self, zipcode=None):
        parser = reqparse.RequestParser()
        parser.add_argument('distance', type=int, ignore=False)
        args = parser.parse_args()

        _distance = args.get('distance')

        # Pass all markets into distance filter
        markets = db.session.query(MarketModel).all()
        locatedMarkets = ZipCodes().locateThings(markets, zipcode, _distance)
        return reply_success(locatedMarkets)


class MarketByProduceResource(Resource):
    """
    /api/produce/<int:id>/market
    """

    def get(self, id=None):

        parser = reqparse.RequestParser()
        parser.add_argument('distance', type=int, ignore=False)
        parser.add_argument('zipcode', type=int, ignore=False)
        args = parser.parse_args()

        _zipcode = args['zipcode']
        _distance = args['distance']

        produceMarkets = db.session().query(VendorProduceModel, VendorModel, MarketVendorModel, MarketModel) \
            .filter_by(produceId=id) \
            .join(VendorModel, VendorProduceModel.vendorId == VendorModel.id) \
            .join(MarketVendorModel, MarketVendorModel.vendorId == VendorProduceModel.vendorId) \
            .join(MarketModel, MarketVendorModel.marketId == MarketModel.id)

        if not _zipcode:
            markets = [{
                        "produceId": id,
                        "marketName": m.marketName,
                        "marketId": m.id
                        }
                for vp, v, mv, m in produceMarkets]
            dedup = list({v['marketId']: v for v in markets}.values())
            return reply_success(dedup)
        else:
            markets = [m for vp, v, mv, m in produceMarkets]
            locatedMarkets = ZipCodes().locateThings(markets, _zipcode, _distance)
            locatedMarketIds = [lm['id'] for lm in locatedMarkets]
            returnMarkets = [{
                        "produceId": id,
                        "marketName": m.marketName,
                        "marketId": m.id
                        }
                for vp, v, mv, m in produceMarkets if m.id in locatedMarketIds]
            dedup = list({v['marketId']: v for v in returnMarkets}.values())
            return reply_success(dedup)


class  MarketByProduceListResource(Resource):
    """
    /api/market/produce/
    """

    def get(self):

        parser = reqparse.RequestParser()
        parser.add_argument('id', type=int, required=True, action='append', ignore=False)
        parser.add_argument('distance', type=int, ignore=False)
        parser.add_argument('zipcode', type=int, ignore=False)
        parser.add_argument('intersect', type=bool, ignore=False)
        args = parser.parse_args()

        _ids = args['id']
        _zipcode = args['zipcode']
        _distance = args['distance']
        _intersect = args['intersect']

        produceMarkets = db.session().query(VendorProduceModel, VendorModel, MarketVendorModel, MarketModel) \
            .filter(VendorProduceModel.produceId.in_(_ids)) \
            .join(VendorModel, VendorProduceModel.vendorId == VendorModel.id) \
            .join(MarketVendorModel, MarketVendorModel.vendorId == VendorProduceModel.vendorId) \
            .join(MarketModel, MarketVendorModel.marketId == MarketModel.id)

        if _intersect:
            allMarkets = []
            for id in _ids:
                markets = [m for vp, v, mv, m in produceMarkets if vp.produceId == id]
                allMarkets.append(markets)
            markets = list(set.intersection(*map(set, allMarkets)))
        else:
            markets = [m for vp, v, mv, m in produceMarkets]

        if _zipcode:
            markets = ZipCodes().locateThings(markets, int(_zipcode), _distance)
            dedup = list({v['id']: v for v in markets}.values())
            return reply_success(dedup)

        # Dedup
        markets = list({v.id: v for v in markets}.values())
        return reply_success(schemas.dump(markets))
