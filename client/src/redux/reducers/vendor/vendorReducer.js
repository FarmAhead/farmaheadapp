import {
  VENDORS_BY_MARKET_ID_RECEIVED,
  VENDORS_REQUESTED,
} from '../../actions/vendor/vendorActionTypes'

const defaultState = {
  vendorsByMarketId: [],
  isLoading: false,
}

const VendorExtrasReducer = (state = defaultState, action) => {
  switch (action.type) {
    case VENDORS_REQUESTED:
      return { ...state, isLoading: true }
    case VENDORS_BY_MARKET_ID_RECEIVED:
      return { ...state, isLoading: false, vendorsByMarketId: action.vendors }
    default:
      return state
  }
}

export default VendorExtrasReducer
