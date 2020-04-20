import json
import os
import time

from farmahead.models import db, MarketModel
from farmahead.resources import MarketResource
from .base import BaseMock


class MarketMock(BaseMock):

    def __init__(self):
        BaseMock.__init__(self)
        self.data_path = os.path.join(self.data_folder, 'markets.json')
        self.data = self.load_data()

    def load_data(self):
        with open(self.data_path, 'r') as file:
            data = json.load(file)
            print(f'Loaded {len(data)} entries from file')
        return data

    def mock(self):
        for e, each in enumerate(self.data):
            market = MarketModel(**each)
            exists = MarketResource.get_one(each['id'])
            if not exists:
                db.session.add(market)
        db.session.commit()

    def mock_bulk(self):
        t0 = time.time()
        data_size = len(self.data)
        chunk_size = 50
        for chunk in range(0, data_size, chunk_size+1):
            db.session.bulk_save_objects(
                [
                    MarketModel(**d) for d in self.data[chunk:min(chunk + chunk_size, data_size)]
                ]
            )
        db.session.commit()
        print("Total time for " + str(data_size) +
            " market records " + str(time.time() - t0) + " secs")