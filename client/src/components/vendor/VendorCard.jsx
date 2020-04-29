import React from 'react'
import { withRouter } from 'react-router'

import FlexBox from '../custom/FlexBox'
import PageCard from '../page-card'

const VendorCard = (props) => {
  const { obj, history } = props
  const { id, vendorName, locationAddress, s3_url, snapStatus, rating } = obj

  return (
    <FlexBox shrink>
      <PageCard
        id={id}
        title={vendorName}
        stars={rating}
        address={locationAddress}
        imgSrc={s3_url}
        snapStatus={snapStatus}
      />
    </FlexBox>
  )
}

export default withRouter(VendorCard)
