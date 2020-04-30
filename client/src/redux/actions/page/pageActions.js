import Axios from 'axios'
import {
  MARKETS_RECEIVED,
  VENDORS_RECEIVED,
  PRODUCE_RECEIVED,
  PAGE_REQUESTED,
} from './pageActionTypes'

import { MARKET, VENDOR, PRODUCE } from '../../../constants/globalConstants'

export function pageRequested() {
  return { type: PAGE_REQUESTED }
}

export function pageReceived(page, pageData) {
  switch (page) {
    case MARKET:
      return { type: MARKETS_RECEIVED, payload: pageData }
    case VENDOR:
      return { type: VENDORS_RECEIVED, payload: pageData }
    case PRODUCE:
      return { type: PRODUCE_RECEIVED, payload: pageData }
    default:
      return { type: 'PAGE_ERROR', payload: [] }
  }
}

// Grab page data based on what page we're on
export function fetchPageInfo(page) {
  return (dispatch) => {
    dispatch(pageRequested())
    return Axios.get(`${process.env.REACT_APP_REST_URL}/${page}`)
      .then((response) => {
        dispatch(pageReceived(page, response.data))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
