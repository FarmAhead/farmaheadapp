import logging;

log = logging.getLogger(__name__)
from flask import request
from flask_restful import Resource, reqparse

from farmahead.models import db, VendorModel, VendorSchema, MarketVendorModel, VendorProduceModel
from farmahead.utils import reply_success, reply_error, reply_missing, ZipCodes, ValidateParameters
from farmahead.utils.exceptions import *

schema = VendorSchema()  # dict
schemas = VendorSchema(many=True)  # list


class VendorResource(Resource):
    """
    TABLE:  vendors
    MODEL:  models.vendor.VendorModel
    SCHEMA: models.vendor.VendorSchema

    /api/vendor
    /api/vendor?id=1
    /api/vendor?market=1
    """

    @staticmethod
    def get_one(_id):
        log.debug(f'Querying VendorModel where id={_id}')
        res = db.session.query(VendorModel).filter_by(id=_id).first()
        return res

    @staticmethod
    def get_all():
        log.debug(f'Querying VendorModel for all rows')
        res = db.session.query(VendorModel).all()
        return res

    @staticmethod
    def get_all_in(ids):
        print(f'Querying VendorModel for ids: ' + str(ids))
        res = db.session.query(VendorModel).filter(VendorModel.id.in_(ids))
        return res

    def get(self):
        # Retrieve existing vendor(s)
        _id = request.args.get('id')
        _market = request.args.get('market')

        # If no params
        if not _id and not _market:
            res = self.get_all()
            return reply_success(schemas.dump(res))

        # Throw error if more than one param
        if _id and _market:
            return reply_error({"message": "Cannot use more than one parameter"})

        # Filter on id
        if _id:
            res = self.get_one(_id)
            if not res:
                return reply_missing(id=_id)

        # Filter on marketId
        if _market:
            marketVendors = db.session().query(MarketVendorModel).filter_by(marketId=_market)
            vendorIds = [mv.vendorId for mv in marketVendors]
            res = self.get_all_in(vendorIds)
            if not res:
                return reply_missing(id=_market)
            return reply_success(schemas.dump(res))
        return reply_success(schema.dump(res))

    def post(self):
        # Create new vendor(s)
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
        # Update existing vendor(s)
        log.warning('This route is not yet implemented')
        pass

    def delete(self):
        # Remove existing vendor(s)
        log.warning('This route is not yet implemented')
        pass


class VendorByProduceResource(Resource):
    """
    /api/vendor/<int:id>/produce
    """

    def get(self, id=None):

        parser = reqparse.RequestParser()
        parser.add_argument('distance', type=int, ignore=False)
        parser.add_argument('zipcode', type=int, ignore=False)
        args = parser.parse_args()

        _ids = args.get('ids')
        _distance = args.get('distance')
        _zipcode = args.get('zipcode')

        produceVendors = db.session().query(VendorProduceModel, VendorModel) \
            .filter_by(produceId=id) \
            .join(VendorModel, VendorProduceModel.vendorId == VendorModel.id)

        vendors = [v for vp, v in produceVendors]
        if _zipcode:
            vendors = ZipCodes().locateThings(vendors, int(_zipcode), _distance)
            return reply_success(vendors)
        return reply_success(schemas.dump(vendors))


class VendorByZipResource(Resource):
    """
    TABLE:  vendor
    MODEL:  models.market.VendorModel
    SCHEMA: models.market.VendorSchema

    /api/vendor/zipcode/{zipcode}
    """

    def get(self, zipcode=None):
        parser = reqparse.RequestParser()
        parser.add_argument('distance', type=int, ignore=False)
        args = parser.parse_args()

        _distance = args.get('distance')

        # Pass all markets into distance filter
        vendors = db.session.query(VendorModel).all()
        locatedVendors = ZipCodes().locateThings(vendors, zipcode, _distance)
        return reply_success(locatedVendors)



class VendorByProduceListResource(Resource):
    """
    /api/vendor/produce/
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

        produceVendors = db.session().query(VendorProduceModel, VendorModel) \
            .filter(VendorProduceModel.produceId.in_(_ids)) \
            .join(VendorModel, VendorProduceModel.vendorId == VendorModel.id)

        if _intersect:
            allVendors = []
            for id in _ids:
                vendors = [ v for vp, v in produceVendors if vp.produceId == id ]
                allVendors.append(vendors)
            vendors = list(set.intersection(*map(set, allVendors)))
        else:
            vendors = [v for vp, v in produceVendors]

        if _zipcode:
            vendors = ZipCodes().locateThings(vendors, int(_zipcode), _distance)
            return reply_success(vendors)

        return reply_success(schemas.dump(vendors))

