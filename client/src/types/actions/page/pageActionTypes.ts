import { Market, Vendor, Produce } from '../../pageTypes'

export const MARKETS_RECEIVED = 'MARKETS_RECEIVED'
export const VENDORS_RECEIVED = 'VENDORS_RECEIVED'
export const PRODUCE_RECEIVED = 'PRODUCE_RECEIVED'
export const PAGE_REQUESTED = 'PAGE_REQUESTED'
export const PAGE_ERROR = 'PAGE_ERROR'

interface PageRequestedAction {
  type: typeof PAGE_REQUESTED
}

interface MarketsReceivedAction {
  type: typeof MARKETS_RECEIVED
  payload: Array<Market>
}

interface VendorsReceivedAction {
  type: typeof VENDORS_RECEIVED
  payload: Array<Vendor>
}

interface ProduceReceivedAction {
  type: typeof PRODUCE_RECEIVED
  payload: Array<Produce>
}

interface DefaultPageAction {
  type: typeof PAGE_ERROR
}

export type PageActionTypes =
  | PageRequestedAction
  | MarketsReceivedAction
  | VendorsReceivedAction
  | ProduceReceivedAction
  | DefaultPageAction
