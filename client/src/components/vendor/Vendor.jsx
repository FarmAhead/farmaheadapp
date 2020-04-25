import React from 'react'
import { useSelector } from 'react-redux'

import FlexBox from '../custom/FlexBox'
import PageCard from '../page-card'
import Paginate from '../custom/Paginate'

const mapStateToProps = (state) => ({
  ...state.vendors,
})

const renderVendorCard = (vendor) => {
  const { vendorName, locationAddress, s3_url } = vendor

  return (
    <FlexBox shrink>
      <PageCard
        title={vendorName}
        stars={Math.random() * 5}
        address={locationAddress}
        imgSrc={s3_url}
      />
    </FlexBox>
  )
}

const Vendor = () => {
  const { vendors = [] } = useSelector(mapStateToProps)

  return <Paginate objects={vendors} renderCard={renderVendorCard} />
}

export default Vendor
