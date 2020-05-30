export interface Market {
  contactName: string
  contactPhone: string
  created_at: string
  id: number
  latitude: number
  locationAddress: string
  locationCity: string
  locationDescription: string
  locationState: string
  locationZip: number
  longitude: number
  marketLink: string
  marketName: string
  modified_at: null
  operationHours: string
  operationSeason: string
  rating: number
  s3_url: string
  snapStatus: boolean
  uuid: string
}

export interface Vendor {
  contactEmail: string
  contactPhone: string
  created_at: string
  firstName: string
  id: number
  lastName: string
  latitude: number
  locationAddress: string
  longitude: number
  modified_at: null
  rating: number
  s3_url: string
  snapStatus: boolean
  uuid: string
  vendorName: string
}

export interface Produce {
  created_at: string
  id: number
  modified_at: null
  produceName: string
  produceType: string
  s3_url: string
  uuid: string
}

export type PageData = Market | Vendor | Produce
