import Axios from 'axios'
import { Dispatch } from 'redux'
import {
  MARKETS_RECEIVED,
  VENDORS_RECEIVED,
  PRODUCE_RECEIVED,
  PAGE_REQUESTED,
  PAGE_ERROR,
  PageActionTypes,
} from '../../../types/actions/page/pageActionTypes'
import { MARKET, VENDOR, PRODUCE } from '../../../constants/globalConstants'
import { Market, Produce, Vendor, PageData } from '../../../types/pageTypes'
import { AppThunk } from '../../../types/AppThunk'

export function pageRequested(): PageActionTypes {
  return { type: PAGE_REQUESTED }
}

export function pageReceived(
  page: string,
  pageData: Array<PageData>
): PageActionTypes {
  switch (page) {
    case MARKET:
      return { type: MARKETS_RECEIVED, payload: pageData as Array<Market> }
    case VENDOR:
      return { type: VENDORS_RECEIVED, payload: pageData as Array<Vendor> }
    case PRODUCE:
      return { type: PRODUCE_RECEIVED, payload: pageData as Array<Produce> }
    default:
      return { type: PAGE_ERROR }
  }
}

// Grab page data based on what page we're on
export function fetchPageInfo(page: string): AppThunk {
  return (dispatch: Dispatch) => {
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
