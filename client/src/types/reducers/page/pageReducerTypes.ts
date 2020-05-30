import { Market, Vendor, Produce } from '../../pageTypes'

export interface MarketState {
  markets: Array<Market>
  isLoading: boolean
}

export interface VendorState {
  vendors: Array<Vendor>
  isLoading: boolean
}

export interface ProduceState {
  produce: Array<Produce>
  isLoading: boolean
}
