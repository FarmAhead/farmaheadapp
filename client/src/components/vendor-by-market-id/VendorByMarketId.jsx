import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import Paginate from '../custom/Paginate'
import { fetchVendorsByMarketId } from '../../redux/actions/vendor/vendorActions'
import FlexBox from '../custom/FlexBox'
import NavHeader from '../nav-header'
import VendorCard from '../vendor/VendorCard'

const mapStateToProps = (state) => ({ ...state.vendorExtras })

const VendorByMarketId = () => {
  const { vendorsByMarketId = [] } = useSelector(mapStateToProps)
  const dispatch = useDispatch()

  const { id: marketId } = useParams()

  useEffect(() => {
    dispatch(fetchVendorsByMarketId(marketId))
  }, [])

  return (
    <FlexBox direction="column" style={{ width: '100%', height: '100%' }}>
      <NavHeader />
      <FlexBox grow style={{ padding: '24px', width: '100%' }}>
        <Paginate objects={vendorsByMarketId} renderCard={VendorCard} />
      </FlexBox>
    </FlexBox>
  )
}

export default VendorByMarketId
