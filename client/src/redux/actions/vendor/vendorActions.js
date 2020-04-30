import Axios from 'axios'

import {
  VENDORS_BY_MARKET_ID_RECEIVED,
  VENDORS_REQUESTED,
} from './vendorActionTypes'

export const vendorsRequested = () => ({
  type: VENDORS_REQUESTED,
})

export const vendorsByMarketIdReceived = (vendors) => ({
  type: VENDORS_BY_MARKET_ID_RECEIVED,
  vendors,
})

export const fetchVendorsByMarketId = (marketId) => {
  return (dispatch) => {
    dispatch(vendorsRequested())

    Axios.get(`${process.env.REACT_APP_REST_URL}/vendor?market=${marketId}`)
      .then((response) => {
        dispatch(vendorsByMarketIdReceived(response.data))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
