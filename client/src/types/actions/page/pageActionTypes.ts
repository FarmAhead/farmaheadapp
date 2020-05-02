import { Market, Vendor, Produce } from "../../pageTypes"

export const MARKETS_RECEIVED = 'MARKETS_RECEIVED'
export const VENDORS_RECEIVED = 'VENDORS_RECEIVED'
export const PRODUCE_RECEIVED = 'PRODUCE_RECEIVED'
export const PAGE_REQUESTED = 'PAGE_REQUESTED'

export interface pageRequestedAction {
    type: typeof PAGE_REQUESTED
}

export interface marketsReceivedAction {
    type: typeof MARKETS_RECEIVED
    payload: Market[]
}

export interface vendorsReceivedAction {
    type: typeof VENDORS_RECEIVED
    payload: Vendor[]
}

export interface produceReceivedAction {
    type: typeof PRODUCE_RECEIVED
    payload: Produce[]
}

export type pageReceivedAction = marketsReceivedAction | vendorsReceivedAction | produceReceivedAction