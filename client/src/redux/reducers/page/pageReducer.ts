import {
  MARKETS_RECEIVED,
  VENDORS_RECEIVED,
  PRODUCE_RECEIVED,
  PAGE_REQUESTED,
} from '../../../types/actions/page/pageActionTypes'

import {
  FILTERED_MARKETS_RECEIVED,
  FILTERED_VENDORS_RECEIVED,
} from '../../../types/actions/filter/filterActionTypes'

import {
  MarketState,
  VendorState,
  ProduceState,
} from '../../../types/reducers/page/pageReducerTypes'

import { Action } from '../../../types/reducers/actionType'
import { Market, Vendor, Produce } from '../../../types/pageTypes'

const marketState: MarketState = {
  markets: [],
  isLoading: false,
}

const vendorState: VendorState = {
  vendors: [],
  isLoading: false,
}

const produceState: ProduceState = {
  produce: [],
  isLoading: false,
}

export const MarketsReducer = (
  state = marketState,
  action: Action<string, Array<Market>>
): MarketState => {
  switch (action.type) {
    case PAGE_REQUESTED:
      return { ...state, isLoading: true }
    case MARKETS_RECEIVED:
      return { ...state, isLoading: false, markets: action.payload || [] }
    case FILTERED_MARKETS_RECEIVED:
      return { ...state, isLoading: false, markets: action.payload || [] }
    default:
      return state
  }
}

export const VendorsReducer = (
  state = vendorState,
  action: Action<string, Array<Vendor>>
): VendorState => {
  switch (action.type) {
    case PAGE_REQUESTED:
      return { ...state, isLoading: true }
    case VENDORS_RECEIVED:
      return { ...state, isLoading: false, vendors: action.payload || [] }
    case FILTERED_VENDORS_RECEIVED:
      return { ...state, isLoading: false, vendors: action.payload || [] }
    default:
      return state
  }
}

export const ProduceReducer = (
  state = produceState,
  action: Action<string, Array<Produce>>
): ProduceState => {
  switch (action.type) {
    case PAGE_REQUESTED:
      return { ...state, isLoading: true }
    case PRODUCE_RECEIVED:
      return { ...state, isLoading: false, produce: action.payload || [] }
    default:
      return state
  }
}
