import React from 'react'
import { useSelector } from 'react-redux'

import Paginate from '../custom/Paginate'
import VendorCard from './VendorCard'

import { VENDOR } from '../../constants/globalConstants'

const mapStateToProps = (state) => ({
  ...state.vendors,
})

const Vendor = () => {
  const { vendors = [] } = useSelector(mapStateToProps)
  <Paginate page={VENDOR} objects={vendors} renderCard={VendorCard} />
}

export default Vendor
