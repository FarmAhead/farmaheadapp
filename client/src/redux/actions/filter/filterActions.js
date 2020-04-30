import Axios from 'axios'
import {
  FILTERED_MARKETS_RECEIVED,
  FILTERED_VENDORS_RECEIVED,
} from './filterActionTypes'
import { pageRequested } from '../page/pageActions'

import { MARKET, VENDOR } from '../../../constants/globalConstants'

export function filteredPageReceived(page, pageData) {
  switch (page) {
    case MARKET:
      return { type: FILTERED_MARKETS_RECEIVED, payload: pageData }
    case VENDOR:
      return { type: FILTERED_VENDORS_RECEIVED, payload: pageData }
    default:
      return { type: 'FILTERED_PAGE_ERROR', payload: [] }
  }
}

export function fetchFilteredPageInfo(page, zipCode, distance) {
  return (dispatch) => {
    dispatch(pageRequested())
    return Axios.get(
      `${process.env.REACT_APP_REST_URL}/${page}/zipcode/${zipCode}?distance=${distance}`
    )
      .then((response) => {
        dispatch(filteredPageReceived(page, response.data))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
