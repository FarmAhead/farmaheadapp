import { combineReducers } from 'redux'
import {
  MarketsReducer,
  VendorsReducer,
  ProduceReducer,
} from './page/pageReducer'
import UserReducer from './user/userReducer'
import ProduceByVendor from './produce/produceReducer'
import VendorExtrasReducer from './vendor/vendorReducer'

export default combineReducers({
  markets: MarketsReducer,
  vendors: VendorsReducer,
  produce: ProduceReducer,
  user: UserReducer,
  produceByVendor: ProduceByVendor,
  vendorExtras: VendorExtrasReducer,
})
